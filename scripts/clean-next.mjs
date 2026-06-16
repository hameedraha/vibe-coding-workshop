import { existsSync, rmSync } from "node:fs";

const nextDir = ".next";

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next build cache.");
} else {
  console.log("No .next directory to remove.");
}
