import { Detail } from "@raycast/api";
import { Fragment } from "react";

interface KanjiMetadataProps {
  result: LookupResult;
}

export default function KanjiMetadata({ result }: KanjiMetadataProps) {
  return (
    <Detail.Metadata>
      {result.kanji.map((k, index) => (
        <Fragment key={`${k.literal}-${index}`}>
          {result.kanji.length > 1 && (
            <Detail.Metadata.Label title="Kanji" text={k.literal} />
          )}

          {k.meanings.length > 0 && (
            <Detail.Metadata.TagList title="Meanings">
              {k.meanings.map((m) => (
                <Detail.Metadata.TagList.Item key={m} text={m} />
              ))}
            </Detail.Metadata.TagList>
          )}

          {k.onyomi && k.onyomi.length > 0 && (
            <Detail.Metadata.TagList title="Onyomi">
              {k.onyomi.map((r) => (
                <Detail.Metadata.TagList.Item key={r} text={r} />
              ))}
            </Detail.Metadata.TagList>
          )}

          {k.kunyomi && k.kunyomi.length > 0 && (
            <Detail.Metadata.TagList title="Kunyomi">
              {k.kunyomi.map((r) => (
                <Detail.Metadata.TagList.Item key={r} text={r} />
              ))}
            </Detail.Metadata.TagList>
          )}

          {result.kanji.length > 1 && index < result.kanji.length - 1 && (
            <Detail.Metadata.Separator />
          )}
        </Fragment>
      ))}
    </Detail.Metadata>
  );
}
