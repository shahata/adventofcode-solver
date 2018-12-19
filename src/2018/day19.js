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
const numbers = arr => arr.map(x => parseInt(x));

function part1(input, reg0 = 0) {
  const lines = input.split('\n');
  const ip = parseInt(
    lines
      .shift()
      .split(' ')
      .pop(),
  );
  const commands = lines.map(x => {
    const [op, ...params] = x.split(' ');
    return { op, params: numbers(params) };
  });
  const r = [reg0, 0, 0, 0, 0, 0];
  while (commands[r[ip]]) {
    // if (reg0 === 1 && r[ip] === 2) {
    //   r[2] = Math.floor(r[5] / r[1]);
    // } else if (reg0 === 1 && r[ip] === 8) {
    //   r[2] = 10551277;
    // } else {
    ops[commands[r[ip]].op](r, ...commands[r[ip]].params);
    // }
    r[ip]++;
  }
  return r[0];
}

function divisors(x) {
  const result = [];
  const sqrt = Math.sqrt(x);
  for (let i = 1; i <= sqrt; i++) {
    if (x % i === 0) {
      result.push(i);
      if (i !== sqrt) {
        result.push(x / i);
      }
    }
  }
  return result;
}

function part2() {
  // return part1(input, 1);
  return divisors(10551276).reduce((sum, x) => sum + x, 0);
}

module.exports = { part1, part2 };
