# Architecture

## Overview

```
Browser (React)
     │  HTTP / Server Components
     ▼
┌─────────────────────────────────────────────────────┐
│  frontend/  (Next.js 16, port 3000)                  │
│  - App Router + Server Components                    │
│  - Auth.js session (Google OAuth)                    │
│  - Calls backend via NEXT_PUBLIC_API_URL             │
└────────────────────┬────────────────────────────────┘
                     │ REST (Bearer token)
                     ▼
┌─────────────────────────────────────────────────────┐
│  backend/  (Express 5, port 4000)                    │
│  - /api/shorts  /api/analytics  /api/posting         │
│  - JWT validation middleware                         │
│  - File upload (Multer)                              │
│  - Prisma → PostgreSQL                               │
│  - Enqueues BullMQ jobs                              │
└────────────────────┬────────────────────────────────┘
                     │ BullMQ
                     ▼
┌─────────────────────────────────────────────────────┐
│  Workers  (same backend process or standalone)       │
│  ┌─────────────────────────────────────────────┐    │
│  │ shorts:transcribe → OpenAI Whisper           │    │
│  │ shorts:detect     → Claude API               │    │
│  │ shorts:cut        → FFmpeg                   │    │
│  │ posting:schedule  → n8n webhook              │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Data Flow — Shorts Generation

```
1. User uploads podcast (POST /api/shorts/upload)
2. Backend saves Podcast record (status=PROCESSING)
3. Backend enqueues shorts:transcribe job
4. transcribe worker → OpenAI Whisper → saves AiJob(TRANSCRIPTION)
5. Enqueues shorts:detect
6. detect worker → Claude API → finds 5 viral moments → saves AiJob(CLIP_DETECTION)
7. Enqueues shorts:cut
8. cut worker → FFmpeg per clip → saves Short records → updates Podcast(status=DONE)
9. Frontend polls GET /api/shorts/:id/status → shows previews
```

## Data Flow — Auto Posting

```
1. User selects Short + platform + scheduledAt
2. POST /api/posting/schedule → creates Schedule record
3. Enqueues posting:schedule with BullMQ delay until scheduledAt
4. At scheduled time, worker POSTs to n8n webhook
5. n8n handles platform OAuth + upload
6. Worker updates Schedule(status=POSTED)
```

## Auth Flow

```
1. User clicks "Sign in with Google"
2. Auth.js → Google OAuth callback → creates/updates User in DB
3. Auth.js issues JWT session cookie (HttpOnly, Secure)
4. Frontend reads session via Auth.js useSession()
5. For API calls: frontend sends Authorization: Bearer <jwt>
6. Backend requireAuth middleware validates JWT
```

## Key Design Decisions

### Why separate frontend/backend processes?

FFmpeg and AI model calls are CPU/memory heavy and can block for minutes. Running them in the same process as the HTTP server would cause request timeouts. The separate backend also lets us scale workers independently.

### Why BullMQ + Redis over a serverless queue?

The deployment target is a VPS. Serverless queues (SQS, Inngest) add external dependencies and egress costs. BullMQ with Redis gives us persistent, retryable, observable jobs that survive process restarts — exactly what we need for a multi-step video pipeline.

### Why n8n for platform posting?

Platform SDK quirks (rate limits, auth refresh, format requirements) change frequently. n8n abstracts this into a visual workflow editor that non-engineers can modify without touching the codebase. It also handles retry logic and error notifications visually.
