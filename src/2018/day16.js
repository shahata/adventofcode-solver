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

function parseSamples(input) {
  let samples = input.split("\n\n\n\n")[0].split("\n\n");
  return samples.map(sample => {
    let [before, instruction, after] = sample.split("\n");
    let regex = /\[(\d+), (\d+), (\d+), (\d+)\]/;
    let [, r1, r2, r3, r4] = numbers(before.match(regex));
    let [, o1, o2, o3, o4] = numbers(after.match(regex));
    let [op, ...params] = numbers(instruction.split(" "));
    let options = Object.keys(ops).filter(op => {
      let r = [r1, r2, r3, r4];
      let o = [o1, o2, o3, o4];
      ops[op](r, ...params);
      return r.join(",") === o.join(",");
    });
    return { op, options };
  });
}

export function part1(input) {
  return parseSamples(input).filter(s => s.options.length >= 3).length;
}

export function part2(input) {
  let result = parseSamples(input);
  let dic = new Array(Object.keys(ops).length).fill();
  dic = dic.map(() => Object.keys(ops));
  result.forEach(({ op, options }) => {
    dic[op] = dic[op].filter(x => options.includes(x));
  });
  while (dic.some(x => x.length > 1)) {
    let done = dic.filter(x => x.length === 1).map(x => x[0]);
    dic = dic.map(x => (x.length > 1 ? x.filter(op => !done.includes(op)) : x));
  }

  let program = input.split("\n\n\n\n").pop();
  let commands = program.split("\n").map(x => numbers(x.split(" ")));
  let r = [0, 0, 0, 0];
  commands.forEach(([op, ...params]) => ops[dic[op][0]](r, ...params));
  return r[0];
}
