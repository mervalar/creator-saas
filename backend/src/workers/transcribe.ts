import { Worker, Job } from "bullmq";
import OpenAI from "openai";
import fs from "fs";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { detectClipsQueue, type TranscribeJobData } from "../queues";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const transcribeWorker = new Worker<TranscribeJobData>(
  "shorts:transcribe",
  async (job: Job<TranscribeJobData>) => {
    const { podcastId, uploadPath, userId } = job.data;
    logger.info({ podcastId }, "Starting transcription");

    await job.updateProgress(10);

    const audioStream = fs.createReadStream(uploadPath);
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    await job.updateProgress(80);

    await prisma.aiJob.create({
      data: {
        userId,
        podcastId,
        type: "TRANSCRIPTION",
        status: "DONE",
        result: transcription as unknown as Record<string, unknown>,
      },
    });

    await detectClipsQueue.add("detect", {
      podcastId,
      transcript: transcription.text,
      userId,
    });

    await job.updateProgress(100);
    logger.info({ podcastId }, "Transcription complete, detect-clips queued");
  },
  { connection: redis, concurrency: 2 },
);

transcribeWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "Transcription job failed");
});
