export function part1(input) {
  let lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  let left = lists.map(a => a[0]).sort((a, b) => a - b);
  let right = lists.map(a => a[1]).sort((a, b) => a - b);
  let scores = left.map((x, i) => Math.abs(x - right[i]));
  return scores.reduce((a, b) => a + b);
}

export function part2(input) {
  let lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  let left = lists.map(a => a[0]).sort((a, b) => a - b);
  let right = lists.map(a => a[1]).sort((a, b) => a - b);
  let scores = left.map(x => x * right.filter(y => y === x).length);
  return scores.reduce((a, b) => a + b);
}
