export function part1(input) {
  let result = input.matchAll(/mul\((\d+),(\d+)\)/g).map(x => x[1] * x[2]);
  return result.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let result = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  let enabled = true;
  let sum = 0;
  for (let x of result) {
    if (x[0] === "do()") enabled = true;
    if (x[0] === "don't()") enabled = false;
    if (enabled && x[0].startsWith("mul(")) sum += x[1] * x[2];
  }
  return sum;
}
