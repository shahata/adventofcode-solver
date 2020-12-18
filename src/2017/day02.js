import { lines, sum } from '../utils/commons.js';

export const part1 = input => {
  const results = lines(input).map(line => {
    const numbers = line
      .split(/\s+/)
      .map(x => +x)
      .sort((a, b) => a - b);
    return numbers.pop() - numbers.shift();
  });
  return sum(results);
};

export const part2 = input => {
  const results = lines(input).map(line => {
    const numbers = line
      .split(/\s+/)
      .map(x => +x)
      .sort((a, b) => a - b);
    const divisible = a => b => a % b === 0;
    let a, b;
    while (numbers.length > 0 && b === undefined) {
      a = numbers.pop();
      b = numbers.find(divisible(a));
    }
    return a / b;
  });
  return sum(results);
};
