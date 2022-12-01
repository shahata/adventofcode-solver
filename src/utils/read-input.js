import * as fs from 'fs';
import { fileURLToPath } from 'url';

export default function readInput(fileUrl) {
  const filename = fileURLToPath(fileUrl);
  const inputFile = filename.replace(/\.[^/\\]*$/, '.txt');
  const input = fs.readFileSync(inputFile).toString().trimEnd();
  return input;
}
