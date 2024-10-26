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
  eqrr: (l, i1, i2, o) => {
    if (i1 === "0") {
      return `case ${l}: r${o} = cb(r${i2}) === r${i2} ? 1 : 0; break;`;
    } else if (i2 === "0") {
      return `case ${l}: r${o} = r${i1} === cb(r${i1}) ? 1 : 0; break;`;
    } else {
      return `case ${l}: r${o} = r${i1} === r${i2} ? 1 : 0; break;`;
    }
  },
};

function run(input, tap) {
  const lines = input.split("\n");
  const ip = +lines.shift().split(" ").pop();
  const commands = lines.map((x, i) => {
    const [op, ...params] = x.split(" ");
    return ops[op](i, ...params);
  });
  const exec = new Function(
    "cb",
    `
    let r0 = 0, r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0;
    while (true) {
      switch (r${ip}) {
        ${commands.join("\n")}
        default: return null;
      }
      r${ip}++;
    }`,
  );
  return exec(tap);
}

export function part1(input) {
  let result;
  run(input, r => (result = r));
  return result;
}

export function part2(input) {
  let prev;
  const all = new Set();
  run(input, r => (all.has(r) ? r : all.add((prev = r)) && undefined));
  return prev;
}
