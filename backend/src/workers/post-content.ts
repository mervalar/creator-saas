import { Worker, Job } from "bullmq";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { type PostingJobData } from "../queues";

export const postContentWorker = new Worker<PostingJobData>(
  "posting:schedule",
  async (job: Job<PostingJobData>) => {
    const { scheduleId, shortId, platform, userId } = job.data;
    logger.info({ scheduleId, platform }, "Triggering post via n8n");

    const short = await prisma.short.findUniqueOrThrow({
      where: { id: shortId },
      include: { podcast: { include: { channel: true } } },
    });

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) throw new Error("N8N_WEBHOOK_URL not configured");

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY ?? "",
      },
      body: JSON.stringify({
        platform,
        shortId,
        userId,
        clipUrl: short.clipUrl,
        title: short.title,
        hashtags: short.hashtags,
        scheduleId,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `n8n webhook failed: ${response.status} ${response.statusText}`,
      );
    }

    const { jobId } = (await response.json()) as { jobId: string };

    await prisma.schedule.update({
      where: { id: scheduleId },
      data: { status: "POSTED", n8nJobId: jobId },
    });

    logger.info(
      { scheduleId, platform, jobId },
      "Post successfully triggered via n8n",
    );
  },
  { connection: redis, concurrency: 3 },
);

postContentWorker.on("failed", async (job, err) => {
  logger.error({ jobId: job?.id, err }, "Post-content job failed");
  if (job?.data.scheduleId) {
    await prisma.schedule.update({
      where: { id: job.data.scheduleId },
      data: { status: "FAILED" },
    });
  }
});
