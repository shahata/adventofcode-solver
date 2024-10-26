function transform(s) {
  return s
    .match(/(.)\1*/g)
    .map(x => `${x.length}${x[0]}`)
    .join("");
}

export function part1(input, times = 40) {
  return new Array(times).fill().reduce(prev => transform(prev), input).length;
}

export function part2(input, times = 50) {
  return new Array(times).fill().reduce(prev => transform(prev), input).length;
}
