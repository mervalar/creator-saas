import { Router } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { prisma } from "../lib/prisma";
import { postingQueue } from "../queues";
import { logger } from "../lib/logger";

const router = Router();

const scheduleSchema = z.object({
  shortId: z.string().cuid(),
  platform: z.enum(["YOUTUBE", "TIKTOK", "INSTAGRAM"]),
  scheduledAt: z.string().datetime(),
});

router.post("/schedule", requireAuth, async (req: AuthRequest, res) => {
  const parsed = scheduleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { shortId, platform, scheduledAt } = parsed.data;

  try {
    const schedule = await prisma.schedule.create({
      data: {
        userId: req.userId!,
        shortId,
        platform,
        scheduledAt: new Date(scheduledAt),
        status: "SCHEDULED",
      },
    });

    const delay = new Date(scheduledAt).getTime() - Date.now();
    await postingQueue.add(
      "post",
      { scheduleId: schedule.id, shortId, platform, userId: req.userId! },
      { delay: Math.max(0, delay) },
    );

    logger.info({ scheduleId: schedule.id, platform }, "Post scheduled");
    res.status(201).json(schedule);
  } catch (err) {
    logger.error({ err }, "Failed to schedule post");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/scheduled", requireAuth, async (req: AuthRequest, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      where: { userId: req.userId! },
      include: { short: true },
      orderBy: { scheduledAt: "asc" },
    });
    res.json(schedules);
  } catch (err) {
    logger.error({ err }, "Failed to fetch schedules");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
