import { combinations } from "combinatorial-generators";

export function part1(input) {
  let items = input.split("\n").map(Number);
  for (let x of combinations(items, 2)) {
    if (x[0] + x[1] === 2020) return x[0] * x[1];
  }
}

export function part2(input) {
  let items = input.split("\n").map(Number);
  for (let x of combinations(items, 3)) {
    if (x[0] + x[1] + x[2] === 2020) return x[0] * x[1] * x[2];
  }
}
