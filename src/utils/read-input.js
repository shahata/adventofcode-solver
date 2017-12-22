const fs = require('fs');

function readInput(filename) {
  const inputFile = filename.replace(/\.[^/\\]*$/, '.txt');
  const input = fs.readFileSync(inputFile).toString().trimRight();
  return input;
}

module.exports = readInput;
