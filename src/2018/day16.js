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

function parseSamples(input) {
  const [instructions] = input.split('\n\n\n\n');
  const cases = instructions.split('\n\n');
  return cases.map(expression => {
    const [before, instruction, after] = expression.split('\n');
    const regex = /\[(\d+), (\d+), (\d+), (\d+)\]/;
    const [, r1, r2, r3, r4] = numbers(before.match(regex));
    const [, o1, o2, o3, o4] = numbers(after.match(regex));
    const params = numbers(instruction.split(' '));
    const options = Object.keys(ops).filter(op => {
      const r = [r1, r2, r3, r4];
      const o = [o1, o2, o3, o4];
      ops[op](r, params[1], params[2], params[3]);
      return r.join(',') === o.join(',');
    });
    return { op: params[0], options };
  });
}

function part1(input) {
  return parseSamples(input).filter(s => s.options.length >= 3).length;
}

function part2(input) {
  const result = parseSamples(input);
  let dic = new Array(Object.keys(ops).length).fill();
  dic = dic.map(() => Object.keys(ops));
  result.forEach(({ op, options }) => {
    dic[op] = dic[op].filter(x => options.includes(x));
  });
  while (dic.some(x => x.length > 1)) {
    const resolved = dic.filter(x => x.length === 1).map(x => x[0]);
    dic = dic.map(x =>
      x.length === 1 ? x : x.filter(op => !resolved.includes(op)),
    );
  }

  const [, program] = input.split('\n\n\n\n');
  const commands = program.split('\n').map(x => numbers(x.split(' ')));
  const r = [0, 0, 0, 0];
  commands.forEach(x => ops[dic[x[0]][0]](r, x[1], x[2], x[3]));
  return r[0];
}

module.exports = { part1, part2 };
