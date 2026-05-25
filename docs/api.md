# API Reference

Base URL: `http://localhost:4000` (dev) / `https://yourdomain.com/api` (prod)

All endpoints except `/health` require `Authorization: Bearer <jwt>`.

---

## Health

### GET /health

```json
{ "status": "ok", "timestamp": "2026-05-25T00:00:00.000Z" }
```

---

## Shorts

### POST /api/shorts/upload

Upload a podcast video to begin the shorts generation pipeline.

**Content-Type:** `multipart/form-data`

| Field     | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| video     | File   | Yes      | .mp4/.mov/.mkv/.webm, max 5 GB |
| channelId | string | Yes      | The creator's channel ID       |
| title     | string | No       | Defaults to filename           |

**Response 201:**

```json
{ "podcastId": "clx...", "status": "processing" }
```

---

### GET /api/shorts/:podcastId/status

Poll for processing status and generated shorts.

**Response 200:**

```json
{
  "status": "DONE",
  "shorts": [
    {
      "id": "clx...",
      "title": "Why most podcasters fail at...",
      "hashtags": ["#podcast", "#contentcreator"],
      "startTime": 142,
      "endTime": 212,
      "clipUrl": "/uploads/shorts/xxx/short_1.mp4",
      "status": "DONE"
    }
  ]
}
```

Status values: `PENDING | PROCESSING | DONE | FAILED`

---

## Analytics

### GET /api/analytics/channels

Returns all connected channels with last 30 days of analytics.

### GET /api/analytics/overview?days=30

Returns aggregated analytics across all channels.

---

## Posting

### POST /api/posting/schedule

Schedule a short for posting on a platform.

**Body:**

```json
{
  "shortId": "clx...",
  "platform": "YOUTUBE",
  "scheduledAt": "2026-05-26T14:00:00.000Z"
}
```

**Response 201:** Schedule object

---

### GET /api/posting/scheduled

Returns all scheduled posts for the authenticated user.

---

## Error format

All errors follow:

```json
{
  "error": "Human readable message",
  "details": {} // optional, for validation errors
}
```
