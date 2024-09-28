import { combinations } from 'combinatorial-generators';

function f(boxes, total, part) {
  const rest = (all, sub) => all.filter(x => sub.indexOf(x) === -1);
  const product = x => x.reduce((p, x) => p * x);

  for (let i = 1; i <= boxes.length; i++) {
    const options = [...combinations(boxes, i)].filter(
      a => a.reduce((s, x) => s + x) === total,
    );
    if (options.length) {
      if (part === 1) {
        return true;
      } else {
        const good = options
          .sort((a, b) => product(a) - product(b))
          .find(x => f(rest(boxes, x), total, part - 1));
        return product(good);
      }
    }
  }
}

function solve(input, x) {
  const boxes = input.split('\n').map(Number);
  const total = boxes.reduce((sum, x) => sum + x);
  return f(boxes, total / x, x);
}

export function part1(input) {
  return solve(input, 3);
}

export function part2(input) {
  return solve(input, 4);
}
