import { divisors } from '../utils/divisors.js';

export function day(input, part1Only = false) {
  input = +input;
  let part1, part2;
  for (let i = 1; part1Only ? !part1 : !part1 || !part2; i++) {
    const numbers = divisors(i);
    const sum = numbers.reduce((sum, x) => sum + x, 0);
    const sub = numbers
      .filter(x => x < Math.ceil(i / 50))
      .reduce((sum, x) => sum + x, 0);
    if (!part1 && sum * 10 >= input) {
      part1 = i;
    }
    if (!part2 && (sum - sub) * 11 >= input) {
      part2 = i;
    }
  }
  return { part1, part2 };
}
