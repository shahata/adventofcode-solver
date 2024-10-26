function parse(input) {
  return input
    .split("\n")
    .map(x => parseInt(x.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2));
}

export function part1(input) {
  return Math.max(...parse(input));
}

export function part2(input) {
  return (
    parse(input)
      .sort((a, b) => a - b)
      .find((n, i, a) => n - a[0] !== i) - 1
  );
}
