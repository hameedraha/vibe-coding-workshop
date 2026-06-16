import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_DIR = join(PROJECT_ROOT, ".next");
const SERVER_DIR = join(NEXT_DIR, "server");
const CHUNKS_DIR = join(SERVER_DIR, "chunks");

/** Dev bundles: __webpack_require__.X(0, ["611","vendor-chunks/next"], ...) */
const WEBPACK_X_PATTERN = /__webpack_require__\.X\(\d+,\s*\[([^\]]+)\]/g;
const QUOTED_REF_PATTERN = /["']([^"']+)["']/g;

export function cleanNextCache(label = "next") {
  if (existsSync(NEXT_DIR)) {
    rmSync(NEXT_DIR, { recursive: true, force: true });
    console.log(`[${label}] Cleared .next and starting fresh.`);
  }
}

function listNumericChunkIds() {
  if (!existsSync(CHUNKS_DIR)) return new Set();

  return new Set(
    readdirSync(CHUNKS_DIR)
      .filter((file) => file.endsWith(".js"))
      .map((file) => file.replace(/\.js$/, "")),
  );
}

function chunkFilePath(chunkRef) {
  if (chunkRef.startsWith("vendor-chunks/")) {
    return join(SERVER_DIR, `${chunkRef}.js`);
  }

  return join(CHUNKS_DIR, `${chunkRef}.js`);
}

function collectMissingChunkRefs(dir, existingNumericChunks, missing) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      collectMissingChunkRefs(fullPath, existingNumericChunks, missing);
      continue;
    }

    if (!entry.name.endsWith(".js")) continue;

    const source = readFileSync(fullPath, "utf8");
    let match = WEBPACK_X_PATTERN.exec(source);

    while (match) {
      const arrayContent = match[1];
      let refMatch = QUOTED_REF_PATTERN.exec(arrayContent);

      while (refMatch) {
        const chunkRef = refMatch[1];

        if (chunkRef.startsWith("vendor-chunks/")) {
          if (!existsSync(chunkFilePath(chunkRef))) {
            missing.add(chunkRef);
          }
        } else if (!existingNumericChunks.has(chunkRef)) {
          missing.add(chunkRef);
        }

        refMatch = QUOTED_REF_PATTERN.exec(arrayContent);
      }

      QUOTED_REF_PATTERN.lastIndex = 0;
      match = WEBPACK_X_PATTERN.exec(source);
    }

    WEBPACK_X_PATTERN.lastIndex = 0;
  }
}

export function getMissingChunkRefs() {
  if (!existsSync(SERVER_DIR)) return [];

  const existingNumericChunks = listNumericChunkIds();
  const missing = new Set();

  collectMissingChunkRefs(SERVER_DIR, existingNumericChunks, missing);

  return [...missing];
}

export function isNextCacheCorrupt() {
  const missing = getMissingChunkRefs();

  if (missing.length > 0) {
    console.warn(
      `[next] Stale .next cache: missing webpack chunks ${missing.join(", ")}.`,
    );
    return true;
  }

  return false;
}

function isNextDevProcess(commandLine) {
  return (
    commandLine.includes("next dev") &&
    (commandLine.includes(PROJECT_ROOT) ||
      commandLine.includes(join(PROJECT_ROOT, "node_modules")))
  );
}

export function stopProjectNextDevProcesses(label = "next") {
  const pidsToStop = [];

  try {
    const output = execSync("ps -eo pid=,command=", { encoding: "utf8" });
    const currentPid = process.pid;

    for (const line of output.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const spaceIndex = trimmed.indexOf(" ");
      if (spaceIndex === -1) continue;

      const pid = Number.parseInt(trimmed.slice(0, spaceIndex), 10);
      const command = trimmed.slice(spaceIndex + 1);

      if (!Number.isFinite(pid) || pid === currentPid) continue;
      if (!isNextDevProcess(command)) continue;

      pidsToStop.push(pid);
    }
  } catch {
    return 0;
  }

  for (const pid of pidsToStop) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // Process may have already exited.
    }
  }

  if (pidsToStop.length > 0) {
    try {
      execSync("sleep 0.2");
    } catch {
      // Ignore sleep failures on exotic platforms.
    }
  }

  let stopped = 0;

  for (const pid of pidsToStop) {
    try {
      process.kill(pid, 0);
      process.kill(pid, "SIGKILL");
      stopped += 1;
      console.warn(`[${label}] Stopped stale next dev process (pid ${pid}).`);
    } catch {
      // Process already exited after SIGTERM.
      stopped += 1;
    }
  }

  if (stopped > 0) {
    try {
      execSync("sleep 0.3");
    } catch {
      // Ignore sleep failures on exotic platforms.
    }
  }

  return stopped;
}
