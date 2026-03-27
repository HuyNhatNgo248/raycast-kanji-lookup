/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API URL - http://localhost:3001/api */
  "apiUrl": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `lookup-kanji` command */
  export type LookupKanji = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `lookup-kanji` command */
  export type LookupKanji = {}
}

