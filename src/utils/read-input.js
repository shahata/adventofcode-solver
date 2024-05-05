import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export default function readInput(fileUrl) {
  let filename = fileURLToPath(fileUrl);
  let inputFile = filename.replace(/\.[^/\\]*$/, '.txt');
  return readFileSync(inputFile).toString().trimEnd();
}
