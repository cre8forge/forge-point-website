#!/usr/bin/env tsx
/**
 * scripts/clear-rejected-slots.ts
 *
 * Reads .image-selections.json, finds all slots marked REJECT,
 * then removes those entries from .image-sourcing.log so
 * the next `npm run images:source` re-fetches only them.
 *
 * Run: npm run images:clear-rejected
 */

import * as fs   from "fs";
import * as path from "path";

const SELECTIONS_PATH = path.join(process.cwd(), "scripts", ".image-selections.json");
const LOG_PATH        = path.join(process.cwd(), "scripts", ".image-sourcing.log");

if (!fs.existsSync(SELECTIONS_PATH)) {
  console.error(`\n❌  ${SELECTIONS_PATH} not found.\n    Export selections from the review HTML first.\n`);
  process.exit(1);
}

if (!fs.existsSync(LOG_PATH)) {
  console.error(`\n❌  ${LOG_PATH} not found.\n    Run npm run images:source first.\n`);
  process.exit(1);
}

const selectionsFile = JSON.parse(fs.readFileSync(SELECTIONS_PATH, "utf8")) as {
  selections: Record<string, { rank: string | number }>;
};

const rejected = new Set<string>(
  Object.entries(selectionsFile.selections)
    .filter(([, v]) => v.rank === "REJECT")
    .map(([k]) => k),
);

console.log(`\nFound ${rejected.size} rejected slot(s) to clear from cache:`);
rejected.forEach(id => console.log(`  • ${id}`));

if (rejected.size === 0) {
  console.log("\nNothing to clear. Exiting.\n");
  process.exit(0);
}

const lines   = fs.readFileSync(LOG_PATH, "utf8").split("\n").filter(Boolean);
const kept:    string[] = [];
let   cleared = 0;

for (const line of lines) {
  try {
    const entry = JSON.parse(line) as { slotId: string };
    if (rejected.has(entry.slotId)) {
      cleared++;
      continue; // drop this line
    }
    kept.push(line);
  } catch {
    kept.push(line); // keep unparseable lines
  }
}

fs.writeFileSync(LOG_PATH, kept.join("\n") + (kept.length ? "\n" : ""), "utf8");

console.log(`\n✅  Cleared ${cleared} cache entries. ${kept.length} remain.`);
console.log(`\nNext step: npm run images:source\n`);
console.log(`   Only the ${rejected.size} cleared slot(s) will be re-fetched.\n`);
