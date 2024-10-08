import fs from "fs";
import path from "path";

export function isTypeScriptProject(): boolean {
  return fs.existsSync(path.join(process.cwd(), "tsconfig.json"));
}
