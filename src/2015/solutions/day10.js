function day(input, times) {
  function transform(s) {
    return s.match(/(.)\1*/g).map(x => x.length + '' + x[0]).join('');
  }

  const part1 = new Array(times || 40).fill(undefined).reduce(prev => transform(prev), input).length;
  const part2 = new Array(times || 50).fill(undefined).reduce(prev => transform(prev), input).length;
  return [part1, part2];
}

module.exports = {day};
