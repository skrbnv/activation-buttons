// Builds src/lib/locales/dict.json from the published activation dictionary.
//
// Source: https://dict.m8.tel/activation/latest.json (manifest: file path -> sha256)
//   v1/general/<locale>.json  { "<path>": { "$type": "text", "$text": "..." } }
//   v1/general/keys.json      [ { "path", "type", "legacyKey" } ]
//
// Output keeps the shape the component already uses:
//   { "<locale>": { language, languageEn, dictionary: { "<path>": "<text>" } } }
// Native/English language names are not part of the published files, so they
// come from scripts/language-names.json.
//
// Nothing is written unless every check passes, so a failed run never clobbers
// the existing dict.json.

import { createHash } from "crypto";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const BASE_URL = "https://dict.m8.tel/activation/";
const SUPPORTED_VERSION = 1;
const OUTPUT_PATH = fileURLToPath(new URL("../src/lib/locales/dict.json", import.meta.url));
const LANGUAGE_NAMES_PATH = new URL("./language-names.json", import.meta.url);

async function get(path) {
    const res = await fetch(BASE_URL + path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
}

const manifest = JSON.parse(await get("latest.json"));
if (manifest.version !== SUPPORTED_VERSION) {
    throw new Error(`Unsupported manifest version ${manifest.version} (expected ${SUPPORTED_VERSION})`);
}

// Download every file and verify its checksum.
const files = {};
await Promise.all(
    Object.entries(manifest.files).map(async ([path, expected]) => {
        const buf = await get(path);
        const actual = createHash("sha256").update(buf).digest("hex");
        if (actual !== expected) throw new Error(`Checksum mismatch for ${path}`);
        files[path] = JSON.parse(buf.toString("utf8"));
    }),
);

const keysPath = Object.keys(files).find((p) => /\/general\/keys\.json$/.test(p));
if (!keysPath) throw new Error("keys.json not found in manifest");
const keyPaths = new Set();
for (const { path, type } of files[keysPath]) {
    if (type !== "text") throw new Error(`Unsupported key type "${type}" for ${path}`);
    keyPaths.add(path);
}

const languageNames = JSON.parse(readFileSync(LANGUAGE_NAMES_PATH, "utf8"));
const dict = {};

// Locale order follows the manifest (it drives the order in the language picker).
for (const filePath of Object.keys(manifest.files)) {
    const match = filePath.match(/\/general\/([^/]+)\.json$/);
    if (!match || match[1] === "keys") continue;
    const locale = match[1];

    if (!languageNames[locale]) {
        throw new Error(`Locale "${locale}" has no entry in scripts/language-names.json`);
    }

    const source = files[filePath];
    const missing = [...keyPaths].filter((p) => !(p in source));
    const unknown = Object.keys(source).filter((p) => !keyPaths.has(p));
    if (missing.length || unknown.length) {
        throw new Error(
            `Locale "${locale}" does not match keys.json` +
                (missing.length ? `; missing: ${missing.join(", ")}` : "") +
                (unknown.length ? `; unknown: ${unknown.join(", ")}` : ""),
        );
    }

    const dictionary = {};
    for (const path of keyPaths) {
        const entry = source[path];
        if (entry.$type !== "text" || typeof entry.$text !== "string") {
            throw new Error(`Locale "${locale}": ${path} is not a text entry`);
        }
        dictionary[path] = entry.$text;
    }

    dict[locale] = {
        language: languageNames[locale].language,
        languageEn: languageNames[locale].languageEn,
        dictionary,
    };
}

if (!dict.en) throw new Error('Locale "en" is missing (it is the default locale)');

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(dict, null, 2) + "\n");

console.log(
    `Saved ${Object.keys(dict).length} locales (${keyPaths.size} keys, published ${manifest.publishedAt}) to src/lib/locales/dict.json`,
);
