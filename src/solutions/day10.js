'use strict';

export function day10(input) {
  function transform(s) {
    return s.match(/(.)\1*/g).map(x => x.length + '' + x[0]).join('');
  }

  let part1 = new Array(40).fill(undefined).reduce(prev => transform(prev), input).length;
  let part2 = new Array(50).fill(undefined).reduce(prev => transform(prev), input).length;
  return [part1, part2];
}
