function step({ chain, skip, current }, length) {
  let currentIsFirst = chain.slice(current).concat(chain.slice(0, current));
  let lengthReversed = currentIsFirst
    .slice(0, length)
    .reverse()
    .concat(currentIsFirst.slice(length));
  let currentRotatedBack = lengthReversed
    .slice(-1 * current)
    .concat(lengthReversed.slice(0, -1 * current));
  return {
    chain: currentRotatedBack,
    skip: skip + 1,
    current: (current + length + skip) % chain.length,
  };
}

function solve(chain, lengths) {
  return lengths.reduce(step, { chain, skip: 0, current: 0 });
}

function solve2(chain, lengths) {
  let result = { chain, skip: 0, current: 0 };
  for (let i = 0; i < 64; i++) {
    result = lengths.reduce(step, result);
  }
  return result.chain;
}

function dense(arr) {
  let result = [];
  while (arr.length > 0) {
    result.push(arr.slice(0, 16).reduce((a, b) => a ^ b, 0));
    arr = arr.slice(16);
  }
  return result;
}

function encode(arr) {
  return arr.map(x => x.toString(16).padStart(2, "0")).join("");
}

function parse(input) {
  return input.split(",").map(Number);
}

function parse2(input) {
  return input
    .split("")
    .map(x => x.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
}

function list(size) {
  return new Array(size).fill().map((x, i) => i);
}

export function part1(input, size = 256) {
  return solve(list(size), parse(input))
    .chain.slice(0, 2)
    .reduce((a, b) => a * b);
}

export function part2(input, size = 256) {
  return encode(dense(solve2(list(size), parse2(input))));
}
