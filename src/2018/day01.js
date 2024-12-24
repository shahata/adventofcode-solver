export function part1(input) {
  return input.split("\n").reduce((prev, x) => prev + +x, 0);
}

export function part2(input) {
  let numbers = input.split("\n").map(Number);
  let visited = new Set();
  let current = 0;
  let frequency = 0;
  while (!visited.has(frequency)) {
    visited.add(frequency);
    frequency += numbers[current % numbers.length];
    current++;
  }
  return frequency;
}
