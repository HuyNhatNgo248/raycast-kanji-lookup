# Kanji Lookup

A Raycast extension to instantly look up kanji and Japanese words — get the hiragana reading and English translation in seconds.

Powered by the [Jisho](https://jisho.org) dictionary API. No API key, no account, completely free.

## Features

- Hiragana reading for any kanji or Japanese word
- English translation and part of speech
- Paste from clipboard instantly with ⌘V
- Copy hiragana or English from the result

## Requirements

- [Raycast](https://raycast.com)
- Node.js
- Internet connection (calls Jisho API)

## Installation

```bash
git clone <your-repo>
cd kanji-lookup
npm install
npm run dev
```

Raycast will open and load the extension automatically.

## Usage

1. Open Raycast and search **"Lookup Kanji"**
2. Type or paste any kanji or Japanese word
3. Press `↩` to look up

Or press `⌘V` to instantly paste from clipboard and look up in one step.

### Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `↩` | Look up |
| `⌘V` | Paste from clipboard and look up |
| `⌘⇧C` | Copy hiragana |
| `⌘⇧,` | Open extension preferences |

### Setting a Global Hotkey

To open Kanji Lookup from anywhere on your Mac without opening Raycast:

1. Search "Lookup Kanji" in Raycast
2. Hover over it and press `⌘K`
3. Select **Configure Extension**
4. Set a **Hotkey** (e.g. `⌥K`)

## Development

```bash
npm run dev     # Start development mode
npm run build   # Build for production
npm run lint    # Lint
```
