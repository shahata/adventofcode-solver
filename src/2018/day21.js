const vm = require('vm');

const ops = {
  addr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} + r${i2}; break;`,
  addi: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} + ${i2}; break;`,
  mulr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} * r${i2}; break;`,
  muli: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} * ${i2}; break;`,
  banr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} & r${i2}; break;`,
  bani: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} & ${i2}; break;`,
  borr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} | r${i2}; break;`,
  bori: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} | ${i2}; break;`,
  setr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1}; break;`,
  seti: (r, i1, i2, o) => `case ${r}: r${o} = ${i1}; break;`,
  gtir: (r, i1, i2, o) => `case ${r}: r${o} = ${i1} > r${i2} ? 1 : 0; break;`,
  gtri: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} > ${i2} ? 1 : 0; break;`,
  gtrr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} > r${i2} ? 1 : 0; break;`,
  eqir: (r, i1, i2, o) => `case ${r}: r${o} = ${i1} === r${i2} ? 1 : 0; break;`,
  eqri: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} === ${i2} ? 1 : 0; break;`,
  eqrr: (r, i1, i2, o) => `case ${r}: r${o} = r${i1} === r${i2} ?1 : 0; break;`,
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
