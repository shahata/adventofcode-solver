import Combinatorics from 'js-combinatorics';
import { execute } from './day05.js';

function run(input, inputValues, state) {
  const user = state ? state.user : { input: inputValues, output: undefined };
  const ops = state ? state.ops : input.split(',').map(x => parseInt(x));
  let ip = state ? state.ip : 0;

  while (ops[ip] % 100 !== 99 && user.output === undefined) {
    ip = execute(ops, ip, user);
  }
  return { user, ops, ip, done: ops[ip] % 100 === 99 };
}

export function part1(input) {
  const permutations = Combinatorics.permutation([0, 1, 2, 3, 4]).toArray();
  const results = permutations.map(permutation => {
    const A = run(input, [permutation[0], 0]).user.output;
    const B = run(input, [permutation[1], A]).user.output;
    const C = run(input, [permutation[2], B]).user.output;
    const D = run(input, [permutation[3], C]).user.output;
    const E = run(input, [permutation[4], D]).user.output;
    return E;
  });
  return Math.max(...results);
}

export function part2(input) {
  const permutations = Combinatorics.permutation([5, 6, 7, 8, 9]).toArray();
  const results = permutations.map(permutation => {
    let A, B, C, D, E, last;
    do {
      A = run(input, [permutation[0], 0], A);
      if (B) {
        B.user.input.push(A.user.output);
        B.user.output = undefined;
      }
      B = run(input, [permutation[1], A.user.output], B);
      if (C) {
        C.user.input.push(B.user.output);
        C.user.output = undefined;
      }
      C = run(input, [permutation[2], B.user.output], C);
      if (D) {
        D.user.input.push(C.user.output);
        D.user.output = undefined;
      }
      D = run(input, [permutation[3], C.user.output], D);
      if (E) {
        E.user.input.push(D.user.output);
        last = E.user.output;
        E.user.output = undefined;
      }
      E = run(input, [permutation[4], D.user.output], E);
      if (A) {
        A.user.input.push(E.user.output);
        A.user.output = undefined;
      }
      if (E.user.output !== undefined) {
        last = E.user.output;
      }
    } while (!E.done);
    return last;
  });
  return Math.max(...results);
}
