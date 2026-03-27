import { Detail } from "@raycast/api";
import { Fragment } from "react";

interface KanjiMetadataProps {
  result: LookupResult;
}

export default function KanjiMetadata({ result }: KanjiMetadataProps) {
  return (
    <Detail.Metadata>
      {result.readings.map((reading, index) => (
        <Fragment key={`${reading.kanji}-${index}`}>
          {result.readings.length > 1 && (
            <Detail.Metadata.Label title="Kanji" text={reading.kanji} />
          )}

          <Detail.Metadata.Label
            title="On'yomi"
            text={reading.onReadings.join("、")}
          />

          <Detail.Metadata.Label
            title="Kun'yomi"
            text={reading.kunReadings.join("、")}
          />

          {result.readings.length > 1 && index < result.readings.length - 1 && (
            <Detail.Metadata.Separator />
          )}
        </Fragment>
      ))}
    </Detail.Metadata>
  );
}
