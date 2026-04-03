function filterKanjiChars(kanji: Kanji[], originalKanji: string) {
  const originalKanjiSet = new Set(originalKanji.split(""));

  return kanji.filter(
    (c) => /\p{Script=Han}/u.test(c.literal) && originalKanjiSet.has(c.literal),
  );
}

export async function lookupKanji(text: string): Promise<LookupResult> {
  const jotobaRes = await fetch("https://jotoba.de/api/search/words", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: text,
      language: "English",
      no_english: false,
    }),
  });

  if (!jotobaRes.ok) throw new Error(`Jotoba error ${jotobaRes.status}`);

  const jotobaData = (await jotobaRes.json()) as Jotoba;

  if (jotobaData.kanji.length === 0 || jotobaData.words.length === 0)
    throw new Error("No results found");

  const entry = jotobaData.words[0];
  const sense = entry.senses[0];

  const pos = Object.keys(sense.pos)[0];
  const original = entry.reading.kanji || "";

  return {
    original,
    furigana: entry.reading.kana || "",
    english: sense.glosses.join(", ") || "",
    partOfSpeech: pos === "0" ? "なし" : pos,
    kanji: filterKanjiChars(jotobaData.kanji, original),
  };
}

export async function lookupSentences(
  word: string,
  limit = 20,
): Promise<SentencePair[]> {
  const API_URL = "https://japsen-lookup.vercel.app";

  const res = await fetch(
    `${API_URL}/api/sentences/search?word=${encodeURIComponent(word)}&limit=${limit}`,
  );

  if (!res.ok) throw new Error(`Failed to fetch sentences: ${res.status}`);

  const data = await res.json();

  return data as SentencePair[];
}
