module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "frontend",
        "backend",
        "prisma",
        "docs",
        "deps",
        "ci",
        "shorts",
        "posting",
        "dashboard",
        "auth",
        "foundation",
      ],
    ],
    "subject-max-length": [2, "always", 72],
  },
};
