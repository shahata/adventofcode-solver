export function part1(input, count = 2020) {
  const start = input.split(',').map(x => +x);
  const map = new Map(start.map((x, i) => [x, i]));

  let next = 0;
  let curr;
  for (let i = start.length; i < count; i++) {
    curr = next;
    next = map.has(curr) ? i - map.get(curr) : 0;
    map.set(curr, i);
  }
  return curr;
}

export function part2(input) {
  return part1(input, 30000000);
}
