import { parse, getter } from './day18.js';

function parseDebug(input, debug) {
  return parse(
    input,
    {
      sub: (p1, p2) => state =>
        (state[p1] = getter(state, p1) - getter(state, p2)),
      jnz: (p1, p2) => state =>
        getter(state, p1) !== 0
          ? (state.instruction += getter(state, p2) - 1)
          : null,
    },
    debug,
  );
}

export function part1(input) {
  const debug = {};
  const commands = parseDebug(input, x => (debug[x] = (debug[x] || 0) + 1));
  const state = { instruction: 0 };
  while (state.instruction < commands.length) {
    commands[state.instruction](state);
    state.instruction++;
  }
  return debug.mul;
}

function isPrime(num) {
  const sqrt = Math.floor(Math.sqrt(num));
  for (let i = 2; i < sqrt + 1; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

export function part2(input) {
  const num =
    parseInt(
      input
        .split('\n')
        .shift()
        .split(' ')
        .pop(),
      10,
    ) *
      100 +
    1e5;
  let count = 0;
  for (let i = 0; i <= 17000; i += 17) {
    if (!isPrime(num + i)) {
      count++;
    }
  }
  return count;
}
