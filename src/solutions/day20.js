'use strict';

export function day20(input) {
  function divisors(x) {
    let nums = [];
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
    let nums = divisors(i);
    let sum = nums.reduce((sum, x) => sum + x, 0);
    let sub = nums.filter(x => x < Math.ceil(i / 50)).reduce((sum, x) => sum + x, 0);
    if (!part1 && sum * 10 >= input) {
      part1 = i;
    }
    if (!part2 && (sum - sub) * 11 >= input) {
      part2 = i;
    }
  }
  return [part1, part2];
}
