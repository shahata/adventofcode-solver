import fs from 'fs';

export default function readInput(filename) {
  const inputFile = filename.replace(/\.[^/\\]*$/, '.txt');
  const input = fs
    .readFileSync(inputFile)
    .toString()
    .trimRight();
  return input;
}
