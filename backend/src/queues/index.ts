import { Queue } from "bullmq";
import { redis } from "../lib/redis";

const connection = { connection: redis };

export const transcribeQueue = new Queue("shorts:transcribe", connection);
export const detectClipsQueue = new Queue("shorts:detect", connection);
export const cutClipsQueue = new Queue("shorts:cut", connection);
export const postingQueue = new Queue("posting:schedule", connection);

export type TranscribeJobData = {
  podcastId: string;
  uploadPath: string;
  userId: string;
};

export type DetectClipsJobData = {
  podcastId: string;
  transcript: string;
  userId: string;
};

export type CutClipsJobData = {
  podcastId: string;
  clips: Array<{ startTime: number; endTime: number }>;
  uploadPath: string;
  userId: string;
};

export type PostingJobData = {
  scheduleId: string;
  shortId: string;
  platform: "YOUTUBE" | "TIKTOK" | "INSTAGRAM";
  userId: string;
};
