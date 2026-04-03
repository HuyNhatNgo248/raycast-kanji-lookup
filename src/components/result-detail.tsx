import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import * as md from "ts-markdown-builder";
import KanjiMetadata from "./kanji-metadata";
import { useEffect, useState } from "react";
import { lookupSentences } from "@/lib/search";

interface ResultDetailProps {
  result: LookupResult;
}

function buildMarkdown(
  result: LookupResult,
  sentences: SentencePair[],
): string {
  const sentenceBlocks = sentences.map((s) =>
    md.joinBlocks([s.jp, md.blockquote(s.en)]),
  );

  return md.joinBlocks([
    md.heading(result.original),
    md.horizontalRule,

    md.heading("Reading", { level: 2 }),
    result.furigana,

    md.heading("Meaning", { level: 2 }),
    result.english,

    md.heading("Part of Speech", { level: 2 }),
    result.partOfSpeech,

    md.heading("Sentences", { level: 2 }),
    ...sentenceBlocks,
  ]);
}

export default function ResultDetail({ result }: ResultDetailProps) {
  const [sentences, setSentences] = useState<SentencePair[]>([]);

  useEffect(() => {
    async function fetchSampleSentences() {
      if (!result.original) return;

      try {
        const sentences = await lookupSentences(result.original);
        setSentences(sentences);
      } catch (e) {
        console.error(e);
      }
    }

    fetchSampleSentences();
  }, [result.original]);

  return (
    <Detail
      markdown={buildMarkdown(result, sentences)}
      navigationTitle={`${result.original} — ${result.furigana}`}
      metadata={<KanjiMetadata result={result} />}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title="Copy Hiragana"
            content={result.furigana}
            icon={Icon.CopyClipboard}
          />
          <Action.CopyToClipboard
            title="Copy English"
            content={result.english}
            icon={Icon.CopyClipboard}
          />
        </ActionPanel>
      }
    />
  );
}
