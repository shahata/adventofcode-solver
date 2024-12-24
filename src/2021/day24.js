function solve(input, digit) {
  let result = new Array(14).fill(digit);
  let stack = [];
  let push;
  input.split("\n").forEach((line, i) => {
    let value = +line.split(" ").pop();
    let curr = Math.floor(i / 18);
    if (i % 18 === 4) push = value === 1;
    if (push && i % 18 === 15) {
      stack.push({ index: curr, diff: value });
    }
    if (!push && i % 18 === 5) {
      let { index, diff } = stack.pop();
      diff += value;
      if (result[index] + diff > 0 && result[index] + diff < 10) {
        result[curr] = result[index] + diff;
      } else {
        result[index] = result[curr] - diff;
      }
    }
  });
  return +result.join("");
}

export function part1(input) {
  return solve(input, 9);
}

export function part2(input) {
  return solve(input, 1);
}
