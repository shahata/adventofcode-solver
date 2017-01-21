'use strict';

function day(input) {
  const result = input.split('\n').map(x => x.split('')).reduce((commons, word) => {
    return word.map((c, i) => {
      commons[i] = commons[i] || {};
      commons[i] = Object.assign(commons[i], {[c]: (commons[i][c] || 0) + 1});
      return commons[i];
    });
  }, []).map(occourences => {
    return Object.keys(occourences)
                 .map(x => ({letter: x, times: occourences[x]}))
                 .sort((a, b) => b.times - a.times)
                 .map(x => x.letter);
  });

  const part1 = result.map(x => x.shift()).join('');
  const part2 = result.map(x => x.pop()).join('');
  return [part1, part2];
}

module.exports = day;
