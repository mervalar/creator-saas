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
      max_memory_restart: "1G",
      env: { NODE_ENV: "production", PORT: 4000 },
    },
    {
      name: "creator-workers",
      script: "./dist/workers/index.js",
      cwd: "./backend",
      instances: 1,
      max_memory_restart: "2G", // workers load FFmpeg + AI responses
      env: { NODE_ENV: "production" },
    },
  ],
};
