interface Kanji {
  literal: string;
  onyomi?: string[];
  kunyomi?: string[];
  meanings: string[];
}

interface Word {
  reading: {
    kana: string;
    kanji: string;
  };
  common: boolean;
  senses: [{ glosses: string[]; pos: { [string]: string } }];
}

interface Jotoba {
  kanji: Kanji[];
  words: Word[];
}

interface LookupResult {
  original: string;
  furigana: string;
  english: string;
  partOfSpeech: string;
  kanji: Kanji[];
}

type SentencePair = {
  jp: string;
  en: string;
};

type Preferences = {
  apiUrl: string;
};
