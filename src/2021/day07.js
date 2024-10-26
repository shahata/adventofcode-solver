export function part1(input, cost = (a, b) => Math.abs(a - b)) {
  const positions = input.split(",").map(Number);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const distances = [];
  for (let i = min; i <= max; i++) {
    distances.push(positions.reduce((prev, x) => prev + cost(x, i), 0));
  }
  return Math.min(...distances);
}

export function part2(input) {
  return part1(input, (a, b) => (Math.abs(a - b) * (Math.abs(a - b) + 1)) / 2);
}
