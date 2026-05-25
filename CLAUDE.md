# CLAUDE.md — AI Podcast Team

> Source of truth for the "AI Podcast Team" SaaS platform.
> Update this file whenever architecture decisions change.

---

## Product Vision

**AI Podcast Team** is a SaaS platform where content creators interact with AI staff member agents that fully automate their content workflow.

The app should feel like:

- An AI production studio
- Premium but friendly
- Modern animated SaaS
- Cinematic AI operating system

Visual inspiration: Linear, Notion, Arc Browser, Runway AI

**The homepage presents AI STAFF MEMBERS**, not a boring dashboard:

- **Chef Agent** → Main dashboard manager
- **Video Editor Agent** → Shorts generator
- **Scheduler Agent** → Auto posting
- **Analytics Agent** → Creator analytics

Users click animated cards to enter sections.

---

## MVP Scope (3 features only)

### 1. Dashboard

- YouTube, TikTok, Instagram analytics
- Growth charts, top videos, engagement metrics
- Recent uploads feed

### 2. Shorts Generator

Upload long podcast → auto-generate 5 shorts automatically

1. Upload video
2. Extract audio
3. Transcribe audio (Whisper)
4. AI detects viral moments (Claude/GPT-4)
5. Generate clip timestamps
6. FFmpeg cuts clips
7. Convert to vertical format (9:16)
8. Add animated subtitles
9. Generate titles/hashtags
10. Preview shorts

### 3. Auto Posting

- Schedule uploads to YouTube / TikTok / Instagram
- AI-generated titles, descriptions, hashtags
- Powered by n8n webhooks

**Do NOT build:** AI comment reply, sponsor system, guest finder, AI prediction, team management, billing, enterprise features.

---

## Tech Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| Frontend   | Next.js 15 (App Router), TypeScript, TailwindCSS, ShadCN UI, Framer Motion |
| Backend    | Node.js + Express (or Fastify), TypeScript                                 |
| Database   | PostgreSQL + Prisma ORM                                                    |
| Queue      | BullMQ + Redis                                                             |
| Video      | FFmpeg                                                                     |
| AI         | OpenAI API (Whisper, GPT-4o), Claude API                                   |
| Automation | n8n                                                                        |
| Auth       | Auth.js (NextAuth v5) — Google OAuth                                       |
| Deployment | VPS + aaPanel + PM2 + Nginx                                                |

---

## Project Architecture

```
creator-saas/
├── frontend/                   # Next.js 15 app (UI layer)
│   ├── app/
│   │   ├── (auth)/             # Login / signup pages
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── page.tsx        # Homepage — AI agent cards
│   │   │   ├── dashboard/      # Analytics dashboard
│   │   │   ├── shorts/         # Shorts generator
│   │   │   └── posting/        # Auto posting scheduler
│   │   └── api/
│   │       └── auth/           # Auth.js route handlers only
│   ├── components/
│   │   ├── ui/                 # ShadCN primitives
│   │   ├── agents/             # AI agent cards (homepage)
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── shorts/             # Shorts generator UI
│   │   └── posting/            # Posting scheduler UI
│   ├── lib/
│   │   ├── auth.ts             # Auth.js config
│   │   ├── api-client.ts       # Typed HTTP client → backend
│   │   └── utils.ts            # Shared frontend utilities
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # Frontend TypeScript types
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                    # Node.js API + BullMQ workers
│   ├── src/
│   │   ├── routes/
│   │   │   ├── shorts.ts       # /api/shorts/* endpoints
│   │   │   ├── posting.ts      # /api/posting/* endpoints
│   │   │   └── analytics.ts    # /api/analytics/* endpoints
│   │   ├── services/
│   │   │   ├── ai/             # OpenAI + Claude service layer
│   │   │   ├── analytics/      # YouTube/TikTok/Instagram APIs
│   │   │   └── video/          # FFmpeg processing helpers
│   │   ├── workers/            # BullMQ job processors
│   │   │   ├── transcribe.ts   # Whisper transcription
│   │   │   ├── detect-clips.ts # AI viral moment detection
│   │   │   ├── cut-clips.ts    # FFmpeg clip cut + subtitle burn
│   │   │   └── post-content.ts # n8n webhook trigger
│   │   ├── queues/
│   │   │   └── index.ts        # BullMQ queue definitions
│   │   ├── middleware/
│   │   │   ├── auth.ts         # JWT validation middleware
│   │   │   └── upload.ts       # Multer file upload handler
│   │   ├── lib/
│   │   │   ├── prisma.ts       # Prisma client singleton
│   │   │   ├── redis.ts        # Redis/BullMQ connection
│   │   │   └── logger.ts       # Structured logger (pino)
│   │   └── index.ts            # Server entry point
│   ├── tsconfig.json
│   └── package.json
│
├── prisma/                     # Shared across both apps
│   ├── schema.prisma
│   └── migrations/
│
├── docs/
│   ├── architecture.md
│   ├── setup.md
│   ├── deployment.md
│   └── api.md
│
├── scripts/                    # Dev/deploy utility scripts
├── .env.example
├── .gitignore
├── ecosystem.config.js         # PM2 config
└── CLAUDE.md                   # This file
```

**Key architectural decision:** Frontend calls `backend` via `NEXT_PUBLIC_API_URL`. The Next.js `api/` folder only handles Auth.js session routes. All business logic, file uploads, queue management, and AI processing live exclusively in `backend/`.

---

## Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  channels      Channel[]
  shorts        Short[]
  schedules     Schedule[]
  aiJobs        AiJob[]
}

model Channel {
  id           String    @id @default(cuid())
  userId       String
  platform     Platform
  platformId   String
  accessToken  String
  refreshToken String?
  expiresAt    DateTime?
  user         User      @relation(fields: [userId], references: [id])
  podcasts     Podcast[]
  analytics    Analytics[]
}

model Podcast {
  id        String    @id @default(cuid())
  channelId String
  title     String
  uploadUrl String
  duration  Int
  status    JobStatus @default(PENDING)
  createdAt DateTime  @default(now())
  channel   Channel   @relation(fields: [channelId], references: [id])
  shorts    Short[]
  aiJobs    AiJob[]
}

model Short {
  id        String    @id @default(cuid())
  podcastId String
  userId    String
  title     String?
  hashtags  String[]
  startTime Int
  endTime   Int
  clipUrl   String?
  status    JobStatus @default(PENDING)
  createdAt DateTime  @default(now())
  podcast   Podcast   @relation(fields: [podcastId], references: [id])
  user      User      @relation(fields: [userId], references: [id])
  schedules Schedule[]
}

model Schedule {
  id          String     @id @default(cuid())
  userId      String
  shortId     String
  platform    Platform
  scheduledAt DateTime
  status      PostStatus @default(SCHEDULED)
  n8nJobId    String?
  createdAt   DateTime   @default(now())
  user        User       @relation(fields: [userId], references: [id])
  short       Short      @relation(fields: [shortId], references: [id])
}

model Analytics {
  id          String   @id @default(cuid())
  channelId   String
  date        DateTime
  views       Int      @default(0)
  subscribers Int      @default(0)
  likes       Int      @default(0)
  comments    Int      @default(0)
  channel     Channel  @relation(fields: [channelId], references: [id])
}

model AiJob {
  id        String    @id @default(cuid())
  userId    String
  podcastId String?
  type      AiJobType
  status    JobStatus @default(PENDING)
  result    Json?
  error     String?
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])
  podcast   Podcast?  @relation(fields: [podcastId], references: [id])
}

enum Platform  { YOUTUBE TIKTOK INSTAGRAM }
enum JobStatus { PENDING PROCESSING DONE FAILED }
enum PostStatus { SCHEDULED POSTED FAILED CANCELLED }
enum AiJobType { TRANSCRIPTION CLIP_DETECTION TITLE_GEN HASHTAG_GEN }
```

---

## Authentication

- **Provider:** Auth.js (NextAuth v5) — Google OAuth
- **Session strategy:** JWT stored in HTTP-only cookies (frontend)
- **API auth:** Frontend passes session token to backend via `Authorization: Bearer` header
- **Backend middleware:** Validates JWT on every protected route
- **Protected routes:** All `(dashboard)` group routes require session

---

## Queue Architecture

```
Frontend (upload)
      ↓
Backend API (/api/shorts/upload)
      ↓
BullMQ (Redis) — queue: shorts:process
      ↓
Worker (backend/src/workers/)
  ├── transcribe.ts   → OpenAI Whisper
  ├── detect-clips.ts → Claude API
  ├── cut-clips.ts    → FFmpeg
  └── post-content.ts → n8n webhook
```

**Queue names:**

- `shorts:transcribe` — Whisper audio transcription
- `shorts:detect` — AI viral moment detection
- `shorts:cut` — FFmpeg clip cutting + subtitle burn
- `posting:schedule` — n8n webhook trigger

**Worker config:**

- Concurrency: 2 (CPU-bound video processing)
- Retry: 3 attempts with exponential backoff
- Job timeout: 10 minutes

---

## Environment Variables

```env
# ─── Shared ───────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/creator_saas
REDIS_URL=redis://localhost:6379

# ─── Frontend (.env.local in /frontend) ───────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:4000

# ─── Backend (.env in /backend) ───────────────
PORT=4000
JWT_SECRET=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
N8N_WEBHOOK_URL=
N8N_API_KEY=
UPLOAD_DIR=/var/uploads/creator-saas
```

---

## Deployment

**Target:** VPS + aaPanel + PM2 + Nginx

```js
// ecosystem.config.js (root)
module.exports = {
  apps: [
    {
      name: "creator-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "./frontend",
      env: { NODE_ENV: "production", PORT: 3000 },
    },
    {
      name: "creator-backend",
      script: "./backend/dist/index.js",
      instances: 1,
      env: { NODE_ENV: "production", PORT: 4000 },
    },
  ],
};
```

**Nginx:** Proxy `yourdomain.com` → port 3000 (frontend), `yourdomain.com/api` → port 4000 (backend). SSL via Let's Encrypt through aaPanel.

---

## Branch Strategy

- `main` — production, protected
- `dev` — integration branch
- `feature/*` — individual features

**Commit convention (Conventional Commits):**

```
feat(shorts): add FFmpeg clip cutting processor
fix(auth): resolve Google OAuth callback redirect
chore(deps): upgrade Next.js to 15.x
```

---

## Code Quality Rules

- Strict TypeScript — no `any`, explicit return types on public functions
- Files > 200 lines must be split
- Server Actions only for auth-adjacent mutations; all other API calls → backend
- No inline styles — TailwindCSS only
- Components: PascalCase | Utilities: camelCase | Types: PascalCase
- Comments only for non-obvious WHY, never for WHAT

---

## Development Phases

### Phase 0 — Foundation ✅ IN PROGRESS

- [x] CLAUDE.md written
- [ ] Frontend: Next.js 15 initialized
- [ ] Frontend: Tailwind + ShadCN + Framer Motion
- [ ] Frontend: ESLint + Prettier + path aliases
- [ ] Frontend: Husky + lint-staged
- [ ] Backend: Express/Fastify scaffold
- [ ] Backend: Prisma schema + migrations
- [ ] Backend: Auth middleware
- [ ] Backend: BullMQ + Redis worker scaffold
- [ ] Homepage: AI agent cards UI

### Phase 1 — Dashboard

- [ ] YouTube Data API integration
- [ ] TikTok API integration
- [ ] Instagram Graph API integration
- [ ] Analytics UI components

### Phase 2 — Shorts Generator

- [ ] Upload system (chunked, multipart)
- [ ] Whisper transcription worker
- [ ] AI clip detection (Claude)
- [ ] FFmpeg cut + subtitle burn
- [ ] Preview UI

### Phase 3 — Auto Posting

- [ ] n8n webhook integration
- [ ] Scheduling UI (calendar)
- [ ] Platform upload flows
- [ ] Post queue management

---

## Key Decisions & Rationale

| Decision                          | Rationale                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Separate frontend/backend folders | Clear separation of concerns; backend can scale/deploy independently; no Next.js API route lock-in for heavy processing |
| Next.js App Router                | Server Components reduce JS bundle; streaming UX for long ops                                                           |
| BullMQ over Inngest               | Self-hosted, no SaaS dependency, matches VPS deployment                                                                 |
| Prisma over Drizzle               | Better DX for rapid schema iteration in early phases                                                                    |
| Auth.js v5                        | First-class Next.js 15 support, cookie-based sessions                                                                   |
| n8n for posting                   | Avoids maintaining platform SDK quirks; visual automation editor; easy to extend                                        |
| pino for logging                  | Fastest Node.js logger; structured JSON; plays well with PM2 log rotation                                               |
