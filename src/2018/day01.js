function part1(input) {
  return input.split('\n').reduce((prev, x) => prev + parseInt(x), 0);
}

function part2(input) {
  const numbers = input.split('\n').map(x => parseInt(x));
  const visited = new Set();
  let current = 0;
  let frequency = 0;
  while (!visited.has(frequency)) {
    visited.add(frequency);
    frequency += numbers[current % numbers.length];
    current++;
  }
  return frequency;
}

module.exports = { part1, part2 };
