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

function run(input, tap, cb) {
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
  const r = [0, 0, 0, 0, 0, 0];
  while (commands[r[ip]]) {
    if (r[ip] === tap) {
      const result = cb(r);
      if (result !== undefined) {
        return result;
      }
    }
    ops[commands[r[ip]].op](r, ...commands[r[ip]].params);
    r[ip]++;
  }
}

function part1(input) {
  return run(input, 28, r => r[3]);
}

function part2(input) {
  let prev;
  const all = new Set();
  return run(input, 28, r =>
    all.has(r[3]) ? prev : all.add((prev = r[3])) && undefined,
  );
}

module.exports = { part1, part2 };
