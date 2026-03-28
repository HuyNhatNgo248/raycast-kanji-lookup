import {
  Action,
  ActionPanel,
  Clipboard,
  Form,
  Icon,
  Toast,
  showToast,
  useNavigation,
  openExtensionPreferences,
} from "@raycast/api";
import { useCallback, useState } from "react";
import { lookupKanji } from "./lib/search";
import ResultDetail from "./components/result-detail";

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const { push } = useNavigation();

  const handleSubmit = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setIsLoading(true);
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: "Looking up…",
        message: trimmed,
      });

      try {
        const result = await lookupKanji(trimmed);
        toast.hide();
        push(<ResultDetail result={result} />);
      } catch (err) {
        toast.style = Toast.Style.Failure;
        toast.title = "Lookup failed";
        toast.message = err instanceof Error ? err.message : "Unknown error";
      } finally {
        setIsLoading(false);
      }
    },
    [push],
  );

  const handlePasteAndLookup = useCallback(async () => {
    const clipboardText = await Clipboard.readText();
    if (clipboardText) {
      setInputText(clipboardText);
      await handleSubmit(clipboardText);
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Clipboard is empty",
      });
    }
  }, [handleSubmit]);

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Look Up"
            icon={Icon.MagnifyingGlass}
            onSubmit={(values) => handleSubmit(values.text)}
          />
          <Action
            title="Paste from Clipboard & Look Up"
            icon={Icon.Clipboard}
            shortcut={{ modifiers: ["cmd"], key: "v" }}
            onAction={handlePasteAndLookup}
          />
          <Action
            title="Update API URL"
            icon={Icon.RotateClockwise}
            onAction={openExtensionPreferences}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="text"
        title="Kanji / Japanese"
        placeholder="Paste kanji or Japanese text here…"
        value={inputText}
        onChange={setInputText}
        autoFocus
      />
      <Form.Description text="Press ⌘↩ to look up · Press ⌘V to paste clipboard and look up instantly" />
    </Form>
  );
}
