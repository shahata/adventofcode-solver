import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export default function readInput(fileUrl) {
  const filename = fileURLToPath(fileUrl);
  const inputFile = filename.replace(/\.[^/\\]*$/, '.txt');
  const input = readFileSync(inputFile).toString().trimEnd();
  return input;
}
