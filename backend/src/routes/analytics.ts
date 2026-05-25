import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";

const router = Router();

router.get("/channels", requireAuth, async (req: AuthRequest, res) => {
  try {
    const channels = await prisma.channel.findMany({
      where: { userId: req.userId! },
      include: {
        analytics: {
          orderBy: { date: "desc" },
          take: 30,
        },
      },
    });
    res.json(channels);
  } catch (err) {
    logger.error({ err }, "Failed to fetch channels");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/overview", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { days = "30" } = req.query;
    const since = new Date();
    since.setDate(since.getDate() - parseInt(days as string));

    const analytics = await prisma.analytics.findMany({
      where: {
        channel: { userId: req.userId! },
        date: { gte: since },
      },
      orderBy: { date: "asc" },
      include: { channel: { select: { platform: true, platformId: true } } },
    });

    res.json(analytics);
  } catch (err) {
    logger.error({ err }, "Failed to fetch analytics overview");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
