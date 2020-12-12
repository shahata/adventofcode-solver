import { execute } from './day09.js';

function check(input, { x, y }) {
  let output;
  let current = 0;
  function read() {
    current++;
    return current % 2 === 1 ? x : y;
  }

  const user = { input: read, output: x => (output = x), base: 0 };
  const ops = input.split(',').map(x => +x);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return output === 1;
}

export function part1(input) {
  let count = 0;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      if (check(input, { x, y })) {
        count++;
      }
    }
  }
  return count;
}

export function part2(input) {
  let point = { x: 0, y: 5 };
  while (point) {
    while (!check(input, point)) {
      point.x++;
    }

    const next = { x: point.x, y: point.y + 1 };
    while (check(input, point)) {
      point.x++;
    }
    if (point.x >= 100 && check(input, { x: point.x - 100, y: point.y + 99 })) {
      return (point.x - 100) * 10000 + point.y;
    }
    point = next;
  }
}
