import { sum, divisors } from '../utils/commons.js';

export function day(input, part1Only = false) {
  input = +input;
  let part1,
    part2 = part1Only;
  for (let i = 1; !part1 || !part2; i++) {
    const numbers = divisors(i);
    const total = sum(numbers);
    const sub = sum(numbers.filter(x => x < Math.ceil(i / 50)));
    if (!part1 && total * 10 >= input) {
      part1 = i;
    }
    if (!part2 && (total - sub) * 11 >= input) {
      part2 = i;
    }
  }
  return { part1, part2 };
}
