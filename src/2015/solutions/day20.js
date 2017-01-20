'use strict';

function day(input) {
  function divisors(x) {
    const nums = [];
    for (let i = 1; i <= Math.sqrt(x); i++) {
      if (x % i === 0) {
        nums.push(i);
        if (i !== Math.sqrt(x)) {
          nums.push(x / i);
        }
      }
    }
    return nums;
  }

  input = parseInt(input);
  let part1, part2;
  for (let i = 1; !part1 || !part2; i++) {
    const nums = divisors(i);
    const sum = nums.reduce((sum, x) => sum + x, 0);
    const sub = nums.filter(x => x < Math.ceil(i / 50)).reduce((sum, x) => sum + x, 0);
    if (!part1 && sum * 10 >= input) {
      part1 = i;
    }
    if (!part2 && (sum - sub) * 11 >= input) {
      part2 = i;
    }
  }
  return [part1, part2];
}

module.exports = day;
