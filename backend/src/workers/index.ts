import "dotenv/config";
import { logger } from "../lib/logger";
import { transcribeWorker } from "./transcribe";
import { detectClipsWorker } from "./detect-clips";
import { cutClipsWorker } from "./cut-clips";
import { postContentWorker } from "./post-content";

const workers = [
  transcribeWorker,
  detectClipsWorker,
  cutClipsWorker,
  postContentWorker,
];

logger.info(`Starting ${workers.length} BullMQ workers`);

const shutdown = async () => {
  logger.info("Graceful shutdown initiated");
  await Promise.all(workers.map((w) => w.close()));
  logger.info("All workers closed");
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
