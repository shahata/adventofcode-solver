function combo(n, r) {
  return [0n, 1n, 2n, 3n, r.A, r.B, r.C][n];
}

const opcodes = [
  (r, p) => (r.A = r.A / 2n ** combo(p, r)),
  (r, p) => (r.B = r.B ^ p),
  (r, p) => (r.B = combo(p, r) % 8n),
  (r, p) => r.A && (r.ip = Number(p) - 2),
  r => (r.B = r.B ^ r.C),
  (r, p) => r.out.push(combo(p, r) % 8n),
  (r, p) => (r.B = r.A / 2n ** combo(p, r)),
  (r, p) => (r.C = r.A / 2n ** combo(p, r)),
];

function run(program, registers) {
  registers = { ...registers, ip: 0, out: [] };
  while (registers.ip < program.length) {
    let op = program[registers.ip];
    let param = BigInt(program[registers.ip + 1]);
    opcodes[op](registers, param);
    registers.ip += 2;
  }
  return registers.out.join(",");
}

function parse(input) {
  let [registers, program] = input.split("\n\n");
  program = program.split(" ").map(r => r.split(",").map(n => +n))[1];
  registers = registers.split("\n").map(r => BigInt(r.split(" ")[2]));
  registers = { A: registers[0], B: registers[1], C: registers[2] };
  return { program, registers };
}

// In general the program always:
// 1) does calculations on A, ignoring B and C
// 2) A = A / 8
// 3) output the calculated value
// 4) if A is not 0, jump to step 1
//
// This solver does the reverse process:
// 1) Find the smallest value to add to A that will output the end of the program
// 2) A = A * 8
// 3) Repeat until it outputs the whole program
function solve2(program, r) {
  for (let i = 0n; i < 8n; i++) {
    const out = run(program, { ...r, A: r.A + i });
    if (program.join(",") === out) return r.A + i;
    if (program.join(",").endsWith(out)) {
      const result = solve2(program, { ...r, A: (r.A + i) * 8n });
      if (result) return result;
    }
  }
}

export function part1(input) {
  const { program, registers } = parse(input);
  return run(program, registers);
}

export function part2(input) {
  const { program, registers } = parse(input);
  return solve2(program, { ...registers, A: 1n });
}
