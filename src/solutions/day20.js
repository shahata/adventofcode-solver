'use strict';

function divisors(x) {
  let nums = [], sqrt = Math.sqrt(x);
  for (let i = 1; i <= sqrt; i++) {
    if (x % i === 0) {
      nums.push(i);
      if (i !== sqrt) {
        nums.push(x / i);
      }
    }
  }
  return nums;
}

export function day20(input) {
  input = parseInt(input);
  let part1, part2;
  let target1 = input / 10, target2 = input / 11;
  for (let i = 1; !part1 || !part2; i++) {
    let nums = divisors(i), ceil = Math.ceil(i / 50);
    let sum = nums.reduce((sum, x) => sum + x, 0);
    let sub = nums.filter(x => x < ceil).reduce((sum, x) => sum + x, 0);
    if (!part1 && sum >= target1) {
      part1 = i;
    }
    if (!part2 && sum - sub >= target2) {
      part2 = i;
    }
  }
  return [part1, part2];
}
