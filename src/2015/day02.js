const parse = input =>
  input.split('\n').map(x => x.split('x').map(x => parseInt(x, 10)));

const part1 = input =>
  parse(input)
    .map(x => [x[0] * x[1], x[1] * x[2], x[0] * x[2]])
    .map(x => 2 * (x[0] + x[1] + x[2]) + Math.min.apply(0, x))
    .reduce((prev, item) => prev + item);

const part2 = input =>
  parse(input)
    .map(
      x => 2 * (x[0] + x[1] + x[2] - Math.max.apply(0, x)) + x[0] * x[1] * x[2],
    )
    .reduce((prev, item) => prev + item);

module.exports = { part1, part2 };
