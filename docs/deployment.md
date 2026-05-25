# Deployment Guide

## Target: VPS + aaPanel + PM2 + Nginx

### Prerequisites on VPS

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
npm install -g pm2

# FFmpeg
sudo apt-get install -y ffmpeg

# PostgreSQL, Redis — via aaPanel or apt
```

---

## 1. Build

```bash
# On VPS or CI
git pull origin main

# Frontend
cd frontend && npm ci && npm run build && cd ..

# Backend
cd backend && npm ci && npm run build && cd ..

# Prisma
npx prisma migrate deploy
```

---

## 2. PM2

Root `ecosystem.config.js`:

```js
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
      script: "./dist/index.js",
      cwd: "./backend",
      instances: 1,
      env: { NODE_ENV: "production", PORT: 4000 },
    },
    {
      name: "creator-workers",
      script: "./dist/workers/index.js",
      cwd: "./backend",
      instances: 1,
      env: { NODE_ENV: "production" },
    },
  ],
};
```

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 3. Nginx

```nginx
# /etc/nginx/sites-available/creator-saas
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;   # long for video upload
        client_max_body_size 5G;   # allow large video uploads
    }
}
```

SSL via aaPanel's Let's Encrypt panel — enable for domain, certificates auto-renew.

---

## 4. Environment

Set production env vars via aaPanel environment manager or directly in `/etc/environment`.

**Critical production changes:**

- `NODE_ENV=production`
- `NEXTAUTH_URL` → your actual domain
- `FRONTEND_URL` → your actual domain
- `NEXT_PUBLIC_API_URL` → `https://yourdomain.com` (Nginx proxies `/api/` to port 4000)

---

## 5. Monitoring

```bash
pm2 status            # process status
pm2 logs              # tail all logs
pm2 logs creator-workers  # worker logs
pm2 monit             # real-time dashboard
```
