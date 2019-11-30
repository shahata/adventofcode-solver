function step({ chain, skip, current }, length) {
  const currentIsFirst = chain.slice(current).concat(chain.slice(0, current));
  const lengthReversed = currentIsFirst
    .slice(0, length)
    .reverse()
    .concat(currentIsFirst.slice(length));
  const currentRotatedBack = lengthReversed
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
  /* eslint no-bitwise: "off" */
  const result = [];
  while (arr.length > 0) {
    result.push(arr.slice(0, 16).reduce((a, b) => a ^ b, 0));
    arr = arr.slice(16);
  }
  return result;
}

function encode(arr) {
  return arr.map(x => x.toString(16).padStart(2, '0')).join('');
}

function parse(input) {
  return input.split(',').map(x => parseInt(x, 10));
}

function parse2(input) {
  return input
    .split('')
    .map(x => x.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
}

function list(size) {
  return new Array(size).fill().map((x, i) => i);
}

export const part1 = (input, size = 256) =>
  solve(list(size), parse(input))
    .chain.slice(0, 2)
    .reduce((a, b) => a * b);
export const part2 = (input, size = 256) =>
  encode(dense(solve2(list(size), parse2(input))));
