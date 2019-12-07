import Combinatorics from 'js-combinatorics';
import { execute } from './day05.js';

function run(input, inputValues, state) {
  const user = { input: inputValues, output: undefined };
  const ops = state ? state.ops : input.split(',').map(x => parseInt(x));
  let ip = state ? state.ip : 0;

  while (ops[ip] % 100 !== 99) {
    try {
      ip = execute(ops, ip, user);
    } catch {
      //waiting for input
      return { user, ops, ip, done: false };
    }
  }
  return { user, ops, ip, done: true };
}

export function part1(input, phases = [0, 1, 2, 3, 4]) {
  const permutations = Combinatorics.permutation(phases).toArray();
  const results = permutations.map(permutation => {
    let A, B, C, D, E;
    do {
      A = run(input, A ? [E.user.output] : [permutation[0], 0], A);
      B = run(input, B ? [A.user.output] : [permutation[1], A.user.output], B);
      C = run(input, C ? [B.user.output] : [permutation[2], B.user.output], C);
      D = run(input, D ? [C.user.output] : [permutation[3], C.user.output], D);
      E = run(input, E ? [D.user.output] : [permutation[4], D.user.output], E);
    } while (!E.done);
    return E.user.output;
  });
  return Math.max(...results);
}

export function part2(input) {
  return part1(input, [5, 6, 7, 8, 9]);
}
