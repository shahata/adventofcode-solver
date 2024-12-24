import { divisors } from "../utils/divisors.js";

const ops = {
  addr: (r, i1, i2, o) => (r[o] = r[i1] + r[i2]),
  addi: (r, i1, i2, o) => (r[o] = r[i1] + i2),
  mulr: (r, i1, i2, o) => (r[o] = r[i1] * r[i2]),
  muli: (r, i1, i2, o) => (r[o] = r[i1] * i2),
  banr: (r, i1, i2, o) => (r[o] = r[i1] & r[i2]),
  bani: (r, i1, i2, o) => (r[o] = r[i1] & i2),
  borr: (r, i1, i2, o) => (r[o] = r[i1] | r[i2]),
  bori: (r, i1, i2, o) => (r[o] = r[i1] | i2),
  setr: (r, i1, i2, o) => (r[o] = r[i1]),
  seti: (r, i1, i2, o) => (r[o] = i1),
  gtir: (r, i1, i2, o) => (r[o] = i1 > r[i2] ? 1 : 0),
  gtri: (r, i1, i2, o) => (r[o] = r[i1] > i2 ? 1 : 0),
  gtrr: (r, i1, i2, o) => (r[o] = r[i1] > r[i2] ? 1 : 0),
  eqir: (r, i1, i2, o) => (r[o] = i1 === r[i2] ? 1 : 0),
  eqri: (r, i1, i2, o) => (r[o] = r[i1] === i2 ? 1 : 0),
  eqrr: (r, i1, i2, o) => (r[o] = r[i1] === r[i2] ? 1 : 0),
};
const numbers = arr => arr.map(Number);

export function part1(input, reg0 = 0) {
  let lines = input.split("\n");
  let ip = +lines.shift().split(" ").pop();
  let commands = lines.map(x => {
    let [op, ...params] = x.split(" ");
    return { op, params: numbers(params) };
  });
  let r = [reg0, 0, 0, 0, 0, 0];
  while (commands[r[ip]]) {
    if (reg0 === 1 && r[ip] === 2) {
      return Math.max(...r);
    }
    ops[commands[r[ip]].op](r, ...commands[r[ip]].params);
    r[ip]++;
  }
  return r[0];
}

export function part2(input) {
  return divisors(part1(input, 1)).reduce((sum, x) => sum + x, 0);
}
