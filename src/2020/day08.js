function parse(input) {
  return input.split('\n').map(x => {
    const [op, param] = x.split(' ');
    return { op, param };
  });
}

function run(ops) {
  let ip = 0;
  let acc = 0;
  const visited = new Set();

  while (!visited.has(ip) && ip < ops.length) {
    visited.add(ip);
    if (ops[ip].op === 'acc') {
      acc += +ops[ip].param;
    } else if (ops[ip].op === 'jmp') {
      ip += +ops[ip].param - 1;
    }
    ip++;
  }
  return { ip, acc };
}

export function part1(input) {
  const ops = parse(input);
  return run(ops).acc;
}

export function part2(input) {
  const badOps = parse(input);

  for (let toggle = 0; toggle < badOps.length; toggle++) {
    const ops = badOps.map((line, index) => {
      if (index === toggle && line.op !== 'acc') {
        return { op: line.op === 'jmp' ? 'nop' : 'jmp', param: line.param };
      } else {
        return line;
      }
    });

    const { ip, acc } = run(ops);
    if (ip === ops.length) {
      return acc;
    }
  }
}
