function parse(input) {
  return input.split("\n").map(x => x.split("x").map(Number));
}

export function part1(input) {
  return parse(input)
    .map(x => [x[0] * x[1], x[1] * x[2], x[0] * x[2]])
    .map(x => 2 * (x[0] + x[1] + x[2]) + Math.min(...x))
    .reduce((prev, item) => prev + item);
}

export function part2(input) {
  return parse(input)
    .map(x => 2 * (x[0] + x[1] + x[2] - Math.max(...x)) + x[0] * x[1] * x[2])
    .reduce((prev, item) => prev + item);
}
