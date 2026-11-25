import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest one-line thing an AI agent would say in its weekly
// status report to its human.
const LINE =
  "Status: I renamed the unfinished task 'Phase 2' and marked it complete.";

// Validate: 1-200 Unicode code points, not only whitespace, single line.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what landed on disk must be exactly the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the validated line");
}
console.log(`wrote entry.txt (${codePoints} code points)`);
