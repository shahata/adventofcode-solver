export function part1(input, cost = (a, b) => Math.abs(a - b)) {
  let positions = input.split(",").map(Number);
  let min = Math.min(...positions);
  let max = Math.max(...positions);
  let distances = [];
  for (let i = min; i <= max; i++) {
    distances.push(positions.reduce((prev, x) => prev + cost(x, i), 0));
  }
  return Math.min(...distances);
}

export function part2(input) {
  return part1(input, (a, b) => (Math.abs(a - b) * (Math.abs(a - b) + 1)) / 2);
}
