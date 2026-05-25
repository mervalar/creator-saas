import { Router } from "express";
import multer from "multer";
import path from "path";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { transcribeQueue } from "../queues";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";

const router = Router();

const upload = multer({
  dest: process.env.UPLOAD_DIR ?? "/tmp/uploads",
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5 GB
  fileFilter: (_, file, cb) => {
    const allowed = [".mp4", ".mov", ".mkv", ".webm"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

router.post(
  "/upload",
  requireAuth,
  upload.single("video"),
  async (req: AuthRequest, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No video file provided" });
      return;
    }

    try {
      const podcast = await prisma.podcast.create({
        data: {
          channelId: req.body.channelId,
          title:
            req.body.title ??
            path.basename(
              req.file.originalname,
              path.extname(req.file.originalname),
            ),
          uploadUrl: req.file.path,
          duration: 0,
          status: "PROCESSING",
        },
      });

      await transcribeQueue.add("transcribe", {
        podcastId: podcast.id,
        uploadPath: req.file.path,
        userId: req.userId!,
      });

      logger.info(
        { podcastId: podcast.id },
        "Podcast uploaded, transcription queued",
      );
      res.status(201).json({ podcastId: podcast.id, status: "processing" });
    } catch (err) {
      logger.error({ err }, "Failed to process upload");
      res.status(500).json({ error: "Upload processing failed" });
    }
  },
);

router.get("/:podcastId/status", requireAuth, async (req: AuthRequest, res) => {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id: req.params.podcastId },
      include: { shorts: true },
    });

    if (!podcast) {
      res.status(404).json({ error: "Podcast not found" });
      return;
    }

    res.json({ status: podcast.status, shorts: podcast.shorts });
  } catch (err) {
    logger.error({ err }, "Failed to fetch podcast status");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
