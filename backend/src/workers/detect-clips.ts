import { Worker, Job } from "bullmq";
import Anthropic from "@anthropic-ai/sdk";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { cutClipsQueue, type DetectClipsJobData } from "../queues";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type ClipMoment = {
  startTime: number;
  endTime: number;
  reason: string;
  viralScore: number;
};

export const detectClipsWorker = new Worker<DetectClipsJobData>(
  "shorts:detect",
  async (job: Job<DetectClipsJobData>) => {
    const { podcastId, transcript, userId } = job.data;
    logger.info({ podcastId }, "Detecting viral clips");

    await job.updateProgress(10);

    const response = await anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a viral content editor for social media. Analyze this podcast transcript and identify exactly 5 viral short-form clips (30–90 seconds each).

Transcript:
${transcript}

Return ONLY a JSON array with this structure:
[
  { "startTime": <seconds>, "endTime": <seconds>, "reason": "<why it's viral>", "viralScore": <1-10> }
]

Focus on: hooks, insights, emotional moments, controversial takes, humor, or actionable tips.`,
        },
      ],
    });

    await job.updateProgress(70);

    const content = response.content[0];
    if (content.type !== "text")
      throw new Error("Unexpected Claude response type");

    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array found in Claude response");

    const clips: ClipMoment[] = JSON.parse(jsonMatch[0]);

    await prisma.aiJob.create({
      data: {
        userId,
        podcastId,
        type: "CLIP_DETECTION",
        status: "DONE",
        result: { clips } as unknown as Record<string, unknown>,
      },
    });

    const podcast = await prisma.podcast.findUniqueOrThrow({
      where: { id: podcastId },
    });
    await cutClipsQueue.add("cut", {
      podcastId,
      clips: clips.map(({ startTime, endTime }) => ({ startTime, endTime })),
      uploadPath: podcast.uploadUrl,
      userId,
    });

    await job.updateProgress(100);
    logger.info(
      { podcastId, clipCount: clips.length },
      "Clips detected, cut-clips queued",
    );
  },
  { connection: redis, concurrency: 2 },
);

detectClipsWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "Clip detection job failed");
});
