function combo(n, r) {
  if (n >= 0n && n <= 3n) return n;
  if (n === 4n) return r.A;
  if (n === 5n) return r.B;
  if (n === 6n) return r.C;
  throw new Error("Invalid combo");
}

const opcodes = [
  /* 0 */ (r, p) => (r.A = r.A / 2n ** combo(p, r)),
  /* 1 */ (r, p) => (r.B = r.B ^ p),
  /* 2 */ (r, p) => (r.B = combo(p, r) % 8n),
  /* 3 */ (r, p) => r.A && (r.ip = Number(p) - 2),
  /* 4 */ r => (r.B = r.B ^ r.C),
  /* 5 */ (r, p) => r.out.push(Number(combo(p, r) % 8n)),
  /* 6 */ (r, p) => (r.B = r.A / 2n ** combo(p, r)),
  /* 7 */ (r, p) => (r.C = r.A / 2n ** combo(p, r)),
];

function run(program, registers) {
  Object.assign(registers, { ip: 0, out: [] });
  while (registers.ip < program.length) {
    let op = program[registers.ip];
    let param = BigInt(program[registers.ip + 1]);
    opcodes[op](registers, param);
    registers.ip += 2;
  }
  return registers;
}

function parse(input) {
  let [registers, program] = input.split("\n\n");
  program = program.split(" ").map(r => r.split(",").map(n => +n))[1];
  registers = registers.split("\n").map(r => BigInt(r.split(" ")[2]));
  registers = { A: registers[0], B: registers[1], C: registers[2] };
  return { program, registers };
}

// in general the program always:
// 1) does calculations on A, ignoring B and C
// 2) A = A / 8
// 3) output the calculated value
// 4) if A is not 0, jump to step 1
//
// This solver does the reverse process:
// 1) Start from A=0
// 2) Find the smallest value to add to A that will output the end of the program
// 3) A = A * 8
// 4) Repeat until it outputs the whole program
function solve2(program, registers, n = program.length - 1) {
  for (let i = 0n; i < 8n; i++) {
    const rs = { ...registers, A: registers.A + i };
    const { out } = run(program, { ...rs });
    if (out.join(",") === program.slice(n).join(",")) {
      if (out.length === program.length) return rs.A;
      const result = solve2(program, { ...rs, A: rs.A * 8n }, n - 1);
      if (result !== undefined) return result;
    }
  }
}

export function part1(input) {
  const { program, registers } = parse(input);
  return run(program, registers).out.join(",");
}

export function part2(input) {
  const { program, registers } = parse(input);
  return solve2(program, { ...registers, A: 0n });
}
