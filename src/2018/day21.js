const vm = require('vm');

const ops = {
  addr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} + r${i2}; break;`,
  addi: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} + ${i2}; break;`,
  mulr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} * r${i2}; break;`,
  muli: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} * ${i2}; break;`,
  banr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} & r${i2}; break;`,
  bani: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} & ${i2}; break;`,
  borr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} | r${i2}; break;`,
  bori: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} | ${i2}; break;`,
  setr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1}; break;`,
  seti: (l, i1, i2, o) => `case ${l}: r${o} = ${i1}; break;`,
  gtir: (l, i1, i2, o) => `case ${l}: r${o} = ${i1} > r${i2} ? 1 : 0; break;`,
  gtri: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} > ${i2} ? 1 : 0; break;`,
  gtrr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} > r${i2} ? 1 : 0; break;`,
  eqir: (l, i1, i2, o) => `case ${l}: r${o} = ${i1} === r${i2} ? 1 : 0; break;`,
  eqri: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} === ${i2} ? 1 : 0; break;`,
  eqrr: (l, i1, i2, o) => `case ${l}: r${o} = r${i1} === r${i2} ?1 : 0; break;`,
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
  const commands = lines.map((x, i) => {
    const [op, ...params] = x.split(' ');
    return ops[op](i, ...numbers(params));
  });
  const script = `(tap, cb) => {
    let r0 = 0, r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0;
    while (true) {
      switch (r${ip}) {
        ${commands.join('\n')}
        default: return null;
      }
      r${ip}++;
      if (r${ip} === tap) {
        const result = cb([r0, r1, r2, r3, r4, r5]);
        if (result) return result;
      }
    }
  }`;
  const exec = vm.runInThisContext(script);
  return exec(tap, cb);
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
