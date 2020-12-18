import { execSync } from 'child_process';
import { lines } from '../utils/commons.js';

function parse(input) {
  return lines(input)
    .map(x => x.match(/(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/).map(x => +x))
    .map(([, x, y, z, r]) => ({ x, y, z, r }));
}

function distance(a, b = { x: 0, y: 0, z: 0 }) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

export function part1(input) {
  const bots = parse(input);
  const strong = bots.sort((a, b) => b.r - a.r)[0];
  const inRange = bots.filter(a => distance(a, strong) <= strong.r);
  return inRange.length;
}

// brew install z3
export function part2(input) {
  const bots = parse(input);
  const smt = `
(declare-const x Int)
(declare-const y Int)
(declare-const z Int)
(declare-const distance Int)
(define-fun in_range ((nx Int) (ny Int) (nz Int) (nr Int)) Int
  (if (<= (+ (abs (- x nx)) (abs (- y ny)) (abs (- z nz))) nr) 1 0)
)
(assert (= distance (+ (abs x) (abs y) (abs z))))
(maximize (+
  ${bots.map(b => `(in_range ${b.x} ${b.y} ${b.z} ${b.r})`).join('\n  ')}
))
(minimize distance)
(check-sat)
(get-model)`;
  const output = lines(execSync('z3 -in', { input: smt }).toString());
  const line =
    output[output.findIndex(line => line.includes('define-fun distance')) + 1];
  return +line.match(/\d+/g).pop();
}
