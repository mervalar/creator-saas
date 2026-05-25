# Setup Guide

## Prerequisites

| Tool       | Version | Notes              |
| ---------- | ------- | ------------------ |
| Node.js    | 20+     | LTS recommended    |
| npm        | 10+     | Ships with Node 20 |
| PostgreSQL | 15+     | Local or Docker    |
| Redis      | 7+      | Local or Docker    |
| FFmpeg     | 6+      | Must be in PATH    |

---

## 1. Clone & install

```bash
git clone git@github.com:mervalar/creator-saas.git
cd creator-saas

# Root workspace (Husky, Prisma)
npm install

# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

---

## 2. Environment variables

```bash
# Root-level shared
cp .env.example .env

# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

Fill in the secrets. At minimum for local dev you need:

- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection (default: `redis://localhost:6379`)
- `NEXTAUTH_SECRET` — any random 32+ char string
- `JWT_SECRET` — same value as `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` — from Google Cloud Console
- `OPENAI_API_KEY` — for Whisper + GPT-4o
- `ANTHROPIC_API_KEY` — for Claude clip detection

---

## 3. Database setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (requires DATABASE_URL)
npx prisma migrate dev --name init

# Seed (optional)
npx prisma db seed
```

---

## 4. Run in development

```bash
# Terminal 1 — Frontend
npm run dev:frontend

# Terminal 2 — Backend API
npm run dev:backend

# Terminal 3 — Workers (optional, only needed for video processing)
cd backend && npx tsx src/workers/index.ts
```

Frontend: http://localhost:3000
Backend API: http://localhost:4000
Health check: http://localhost:4000/health

---

## 5. Google OAuth setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (Web application)
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID + Secret to `.env.local`

---

## 6. Upload directory

```bash
sudo mkdir -p /var/uploads/creator-saas
sudo chown $USER /var/uploads/creator-saas
```

Or change `UPLOAD_DIR` in `backend/.env` to a path you own.
