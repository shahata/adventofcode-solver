export function part1(input, count = 2020) {
  const start = input.split(',').map(x => +x);
  const map = new Map();

  let curr = 0;
  let prev = undefined;
  start.forEach((x, i) => map.set(x, i));
  for (let i = start.length; i < count; i++) {
    prev = curr;
    curr = map.has(prev) ? i - map.get(prev) : 0;
    map.set(prev, i);
  }
  return prev;
}

export function part2(input) {
  return part1(input, 30000000);
}
