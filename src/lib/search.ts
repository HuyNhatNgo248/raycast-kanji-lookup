// import { getPreferenceValues } from "@raycast/api";

export async function lookupKanji(text: string): Promise<LookupResult> {
  // Only fetch kanji characters (Han script)
  const kanjiChars = text.split("").filter((c) => /\p{Script=Han}/u.test(c));

  const [jishoRes, ...kanjiRes] = await Promise.all([
    fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(text)}`,
    ),
    ...kanjiChars.map((c) =>
      fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(c)}`),
    ),
  ]);

  if (!jishoRes.ok) throw new Error(`Jisho error ${jishoRes.status}`);
  const jishoData = await jishoRes.json();

  if (!jishoData.data || jishoData.data.length === 0)
    throw new Error("No results found");

  const entry = jishoData.data[0];
  const hiraganaReading = entry.japanese[0];
  const sense = entry.senses[0];

  const readings: KanjiReading[] = await Promise.all(
    kanjiRes.map(async (res, idx) => {
      try {
        if (!res || !res.ok) throw Error();

        const kanjiData = await res.json();
        return {
          kanji: kanjiData.kanji ?? kanjiChars[idx],
          onReadings: kanjiData.on_readings ?? [],
          kunReadings: kanjiData.kun_readings ?? [],
        };
      } catch (e) {
        console.error(e);

        return {
          kanji: kanjiChars[idx],
          onReadings: [],
          kunReadings: [],
        };
      }
    }),
  );

  return {
    original: hiraganaReading.word ?? text,
    hiragana: hiraganaReading.reading ?? "",
    english: sense.english_definitions.join(", "),
    partOfSpeech: sense.parts_of_speech?.[0] ?? "",
    readings,
  };
}

export async function lookupSentences(
  word: string,
  limit = 20,
): Promise<SentencePair[]> {
  // const preferences = getPreferenceValues<Preferences>();

  // const API_URL = preferences.apiUrl;

  const API_URL = "https://japsen-lookup.vercel.app";

  const res = await fetch(
    `${API_URL}/api/sentences/search?word=${encodeURIComponent(word)}&limit=${limit}`,
  );

  if (!res.ok) throw new Error(`Failed to fetch sentences: ${res.status}`);

  const data = await res.json();

  return data as SentencePair[];
}
