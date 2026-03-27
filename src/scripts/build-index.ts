import fs from "fs";
import path from "path";
import readline from "readline";

// -----------------------------
// TYPES
// -----------------------------
type SentencePair = {
  jp: string;
  en: string;
};

// -----------------------------
// PATHS
// -----------------------------
const INPUT = path.join(__dirname, "../../translation.tsv");
const OUTPUT = path.join(__dirname, "../../kanji-index.json");

// -----------------------------
// LOAD TRANSLATIONS (TSV)
// -----------------------------
async function loadPairs(): Promise<SentencePair[]> {
  const pairs: SentencePair[] = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line) continue;

    const parts = line.split("\t");
    if (parts.length < 4) continue;

    const [, jp, , en] = parts;

    if (!jp || !en) continue;

    pairs.push({ jp, en });
  }

  return pairs;
}

// -----------------------------
// MAIN
// -----------------------------
async function main() {
  console.log("📥 Loading translations.tsv...");
  const pairs = await loadPairs();
  console.log("Pairs:", pairs.length);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(pairs));

  console.log("✅ Done!");
  console.log("📦 Output:", OUTPUT);
}

main().catch(console.error);
