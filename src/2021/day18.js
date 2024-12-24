let open = -1;
let close = -2;

function run(snail, split) {
  let depth = 0;
  let last, next;
  for (let i = 0; i < snail.length; i++) {
    if (split && snail[i] >= 10) {
      let number = snail[i] / 2;
      snail.splice(i, 1, open, Math.floor(number), Math.ceil(number), close);
    }
    if (depth === 4 && snail[i] === open) {
      for (next = i + 4; next < snail.length && snail[next] < 0; next++);
      if (snail[last] !== undefined) snail[last] += snail[i + 1];
      if (snail[next] !== undefined) snail[next] += snail[i + 2];
      snail.splice(i, 4, 0);
      return true;
    }
    if (snail[i] === open) depth++;
    if (snail[i] === close) depth--;
    if (snail[i] >= 0) last = i;
  }
}

function add(a, b) {
  let snail = [open, ...a, ...b, close];
  while (run(snail, false));
  while (run(snail, true));
  return snail;
}

function magnitude(snail) {
  let sum = i => 3 * snail[i + 1] + 2 * snail[i + 2];
  let pair = i => snail[i + 1] >= 0 && snail[i + 2] >= 0;
  while (snail.length > 1) {
    let next = snail.findIndex((x, i) => pair(i));
    snail.splice(next, 4, sum(next));
  }
  return snail[0];
}

function parse(str) {
  let snail = str.replaceAll(",", "").split("");
  return snail.map(x => (x === "[" ? open : x === "]" ? close : +x));
}

export function part1(input) {
  return magnitude(input.split("\n").map(parse).reduce(add));
}

export function part2(input) {
  let lines = input.split("\n").map(parse);
  let max = 0;
  for (let a of lines) {
    for (let b of lines) {
      max = Math.max(max, a !== b ? magnitude(add(a, b)) : 0);
    }
  }
  return max;
}
