import { ocr } from '../utils/ocr.js';

export function part1(input) {
  const lines = input.split('\n');
  let sum = 0;
  let cycle = 0;
  let x = 1;
  function progress() {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      sum += x * cycle;
    }
  }
  for (const line of lines) {
    if (line === 'noop') progress();
    else {
      progress();
      progress();
      x += +line.split(' ').pop();
    }
  }
  return sum;
}

export function part2(input) {
  const lines = input.split('\n');
  let result = '';
  let cycle = 0;
  let x = 1;
  function progress() {
    if (cycle % 40 === 0) result += '\n';
    result += Math.abs((cycle % 40) - x) <= 1 ? '#' : '.';
    cycle++;
  }
  for (const line of lines) {
    if (line === 'noop') progress();
    else {
      progress();
      progress();
      x += +line.split(' ').pop();
    }
  }
  return ocr(result.trim());
}
