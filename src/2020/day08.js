function parse(input) {
  return input.split("\n").map(x => {
    let [op, param] = x.split(" ");
    return { op, param };
  });
}

function run(ops) {
  let ip = 0;
  let acc = 0;
  let visited = new Set();

  while (!visited.has(ip) && ip < ops.length) {
    visited.add(ip);
    if (ops[ip].op === "acc") {
      acc += +ops[ip].param;
    } else if (ops[ip].op === "jmp") {
      ip += +ops[ip].param - 1;
    }
    ip++;
  }
  return { ip, acc };
}

export function part1(input) {
  let { acc } = run(parse(input));
  return acc;
}

export function part2(input) {
  let bad = parse(input);

  for (let toggle = 0; toggle < bad.length; toggle++) {
    let ops = bad.map(({ op, param }, index) => {
      if (index === toggle && op !== "acc") {
        return { op: op === "jmp" ? "nop" : "jmp", param };
      } else {
        return { op, param };
      }
    });

    let { ip, acc } = run(ops);
    if (ip === ops.length) {
      return acc;
    }
  }
}
