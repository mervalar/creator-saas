import { Worker, Job } from "bullmq";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { type CutClipsJobData } from "../queues";

const execFileAsync = promisify(execFile);
const OUTPUT_DIR = process.env.UPLOAD_DIR ?? "/tmp/uploads";

async function cutAndConvert(
  inputPath: string,
  startTime: number,
  endTime: number,
  outputPath: string,
): Promise<void> {
  // Cut clip, scale to 9:16 vertical, add padding for letterboxed content
  await execFileAsync("ffmpeg", [
    "-ss",
    String(startTime),
    "-to",
    String(endTime),
    "-i",
    inputPath,
    "-vf",
    "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black",
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "fast",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    "-y",
    outputPath,
  ]);
}

export const cutClipsWorker = new Worker<CutClipsJobData>(
  "shorts:cut",
  async (job: Job<CutClipsJobData>) => {
    const { podcastId, clips, uploadPath, userId } = job.data;
    logger.info({ podcastId, clipCount: clips.length }, "Cutting clips");

    const outputDir = path.join(OUTPUT_DIR, "shorts", podcastId);
    await fs.mkdir(outputDir, { recursive: true });

    for (let i = 0; i < clips.length; i++) {
      const { startTime, endTime } = clips[i];
      const outputPath = path.join(outputDir, `short_${i + 1}.mp4`);

      await cutAndConvert(uploadPath, startTime, endTime, outputPath);

      await prisma.short.updateMany({
        where: { podcastId, status: "PENDING" },
        data: { clipUrl: outputPath, status: "DONE" },
      });

      await job.updateProgress(Math.round(((i + 1) / clips.length) * 100));
      logger.info({ podcastId, clip: i + 1 }, "Clip cut complete");
    }

    await prisma.podcast.update({
      where: { id: podcastId },
      data: { status: "DONE" },
    });

    logger.info({ podcastId }, "All clips cut, podcast processing complete");
  },
  { connection: redis, concurrency: 1 }, // FFmpeg is CPU-bound; limit to 1
);

cutClipsWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "Cut-clips job failed");
});
