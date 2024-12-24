import { combinations } from "combinatorial-generators";

export function part1(input, preamble = 25) {
  let numbers = input.split("\n").map(Number);
  let stack = [];
  for (let i = 0; i < numbers.length; i++) {
    if (stack.length === preamble) {
      let sums = [...combinations(stack, 2)].map(x => x[0] + x[1]);
      if (!sums.includes(numbers[i])) {
        return numbers[i];
      }
      stack.pop();
    }
    stack.unshift(numbers[i]);
  }
}

export function part2(input, preamble = 25) {
  let target = part1(input, preamble);
  let numbers = input.split("\n").map(Number);
  for (let i = 0; i < numbers.length; i++) {
    let sum, j;
    for (j = i, sum = 0; sum < target; j++) {
      sum += numbers[j];
    }
    if (sum === target) {
      let slice = numbers.slice(i, j);
      return Math.min(...slice) + Math.max(...slice);
    }
  }
}
