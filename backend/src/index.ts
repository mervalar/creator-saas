import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./lib/logger";
import shortsRouter from "./routes/shorts";
import analyticsRouter from "./routes/analytics";
import postingRouter from "./routes/posting";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() }),
);

app.use("/api/shorts", shortsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/posting", postingRouter);

app.listen(PORT, () => {
  logger.info(`Backend running on port ${PORT}`);
});

export default app;
