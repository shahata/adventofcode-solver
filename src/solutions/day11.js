'use strict';

export function day11(input) {
  let abc = 'abcdefghijklmnopqrstuvwxyz';
  let substrs = [];
  for (let i = 0; abc.substr(i, 3).length === 3; i++) {
    substrs.push(abc.substr(i, 3));
  }

  function ok(s) {
    return s.match(/^[a-z]*$/) &&
           s.match(/(.)\1.*(.)\2/) &&
           s.match(/^[^iol]*$/) &&
           substrs.some(sub => s.indexOf(sub) > -1);
  }

  function next(password) {
    let s = parseInt(password, 36) + 1;
    while (!ok(s.toString(36))) {
      s++;
    }
    return s.toString(36);
  }

  let part1 = next(input);
  let part2 = next(part1);
  return [part1, part2];
}
