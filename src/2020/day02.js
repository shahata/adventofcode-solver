import { lines } from '../utils/commons.js';

export function part1(input) {
  const result = lines(input).filter(x => {
    const [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    const count = password.split('').filter(x => x === character).length;
    return count >= +start && count <= +end;
  }).length;
  return result;
}

export function part2(input) {
  const result = lines(input).filter(x => {
    const [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    const a = password[start - 1] === character ? 1 : 0;
    const b = password[end - 1] === character ? 1 : 0;
    return a + b === 1;
  }).length;
  return result;
}
