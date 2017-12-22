function transform(s) {
  return s.match(/(.)\1*/g).map(x => x.length + '' + x[0]).join('');
}

const part1 = (input, times = 40) => new Array(times).fill(undefined).reduce(prev => transform(prev), input).length;
const part2 = (input, times = 50) => new Array(times).fill(undefined).reduce(prev => transform(prev), input).length;

module.exports = {part1, part2};
