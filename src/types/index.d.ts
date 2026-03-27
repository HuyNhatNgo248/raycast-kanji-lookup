interface KanjiReading {
  kanji: string;
  onReadings: string[];
  kunReadings: string[];
}

interface LookupResult {
  original: string;
  hiragana: string;
  english: string;
  partOfSpeech: string;
  readings: KanjiReading[];
}

type SentencePair = {
  jp: string;
  en: string;
};

type Preferences = {
  apiUrl: string;
};
