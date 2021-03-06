function transform(s) {
  return s
    .match(/(.)\1*/g)
    .map(x => x.length + '' + x[0])
    .join('');
}

export const part1 = (input, times = 40) =>
  new Array(times).fill().reduce(prev => transform(prev), input).length;
export const part2 = (input, times = 50) =>
  new Array(times).fill().reduce(prev => transform(prev), input).length;
