function next(x, factor, validator) {
  do {
    x = (x * factor) % 2147483647;
  } while (x % validator !== 0);
  return x;
}

function judge(a, b, validators, times) {
  let count = 0;
  for (let i = 0; i < times; i++) {
    a = next(a, 16807, validators[0]);
    b = next(b, 48271, validators[1]);
    if (a % 65536 === b % 65536) {
      count++;
    }
  }
  return count;
}

function parse(input) {
  return input.split("\n").map(x => +x.match(/\d+$/).pop());
}

export function part1(input, times = 4e7) {
  return judge(...parse(input), [1, 1], times);
}

export function part2(input, times = 5e6) {
  return judge(...parse(input), [4, 8], times);
}
