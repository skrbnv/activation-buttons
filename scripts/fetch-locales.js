import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const DICT_URL = "https://storage.yandexcloud.net/dict.m8.tel/s_dict.json";
const OUTPUT_PATH = new URL("../src/lib/locales/dict.json", import.meta.url);

const res = await fetch(DICT_URL);
if (!res.ok) throw new Error(`Failed to fetch dictionary: ${res.status} ${res.statusText}`);

const data = await res.json();

mkdirSync(dirname(fileURLToPath(OUTPUT_PATH)), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));

console.log(`Saved ${Object.keys(data).length} locales to src/lib/locales/dict.json`);
