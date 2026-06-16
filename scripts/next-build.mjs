import { spawn } from "node:child_process";
import { cleanNextCache, stopProjectNextDevProcesses } from "./next-cache.mjs";

stopProjectNextDevProcesses("build");
cleanNextCache("build");

const child = spawn("next", ["build"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
