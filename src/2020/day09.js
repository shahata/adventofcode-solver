import { combinations } from 'combinatorial-generators';

export function part1(input, preamble = 25) {
  const numbers = input.split('\n').map(Number);
  const stack = [];
  for (let i = 0; i < numbers.length; i++) {
    if (stack.length === preamble) {
      const sums = [...combinations(stack, 2)].map(x => x[0] + x[1]);
      if (!sums.includes(numbers[i])) {
        return numbers[i];
      }
      stack.pop();
    }
    stack.unshift(numbers[i]);
  }
}

export function part2(input, preamble = 25) {
  const target = part1(input, preamble);
  const numbers = input.split('\n').map(Number);
  for (let i = 0; i < numbers.length; i++) {
    let sum, j;
    for (j = i, sum = 0; sum < target; j++) {
      sum += numbers[j];
    }
    if (sum === target) {
      const slice = numbers.slice(i, j);
      return Math.min(...slice) + Math.max(...slice);
    }
  }
}
