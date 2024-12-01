export function part1(input) {
  const lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  const left = lists.map(a => a[0]).sort((a, b) => a - b);
  const right = lists.map(a => a[1]).sort((a, b) => a - b);
  const scores = left.map((x, i) => Math.abs(x - right[i]));
  return scores.reduce((a, b) => a + b);
}

export function part2(input) {
  const lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  const left = lists.map(a => a[0]).sort((a, b) => a - b);
  const right = lists.map(a => a[1]).sort((a, b) => a - b);
  const scores = left.map(x => x * right.filter(y => y === x).length);
  return scores.reduce((a, b) => a + b);
}
