'use strict';

function day(input) {
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  const substrs = abc.split('').map((x, i) => abc.substr(i, 3)).filter(x => x.length === 3);

  function ok(s) {
    return s.match(/^[a-z]*$/) &&
           s.match(/^[^iol]*$/) &&
           s.match(/(.)\1.*(.)\2/) &&
           substrs.some(sub => s.indexOf(sub) > -1);
  }

  function next(password) {
    let s = parseInt(password, 36);
    do {
      s++;
    } while (!ok(s.toString(36)));
    return s.toString(36);
  }

  const part1 = next(input);
  const part2 = next(part1);
  return [part1, part2];
}

module.exports = {day};
