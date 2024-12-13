import { init } from "z3-solver";

function solve({ ax, ay, bx, by, px, py }) {
  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      const x = a * ax + b * bx;
      const y = a * ay + b * by;
      if (x === px && y === py) {
        return a * 3 + b;
      }
    }
  }
  return 0;
}

export function part1(input) {
  let machines = input.split("\n\n").map(group => {
    const [a, b, prize] = group.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, px, py] = prize.match(/X=(\d+), Y=(\d+)/);
    return { ax: +ax, ay: +ay, bx: +bx, by: +by, px: +px, py: +py };
  });
  const price = machines.map(solve).reduce((a, b) => a + b, 0);
  return price;
}

async function solve2({ ax, ay, bx, by, px, py }) {
  px += 10000000000000;
  py += 10000000000000;
  const { Context } = await init();
  const { Solver, Int } = Context("main");
  const solver = new Solver();
  const a = Int.const(`a`);
  const b = Int.const(`b`);
  solver.add(a.ge(0));
  solver.add(b.ge(0));
  solver.add(a.mul(ax).add(b.mul(bx)).eq(px));
  solver.add(a.mul(ay).add(b.mul(by)).eq(py));
  if ((await solver.check()) === "sat") {
    const model = solver.model();
    const result = model.eval(a.mul(3).add(b)).toString();
    return +result;
  }
  return 0;
}

export async function part2(input) {
  let machines = input.split("\n\n").map(group => {
    const [a, b, prize] = group.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, px, py] = prize.match(/X=(\d+), Y=(\d+)/);
    return { ax: +ax, ay: +ay, bx: +bx, by: +by, px: +px, py: +py };
  });
  let price = 0;
  for (const machine of machines) {
    price += await solve2(machine);
  }
  return price;
}
