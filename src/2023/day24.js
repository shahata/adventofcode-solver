import { init } from 'z3-solver';

function parse(input) {
  return input.split('\n').map(line => {
    let [point, velocity] = line.split(' @ ');
    point = point.split(', ').map(n => +n);
    velocity = velocity.split(', ').map(n => +n);
    return { point, velocity };
  });
}

export function part1(input, min = 2e14, max = 4e14) {
  let hails = parse(input);
  hails = hails.map(({ point, velocity }) => {
    let point2 = point.map((n, i) => n + velocity[i]);
    let m = (point[1] - point2[1]) / (point[0] - point2[0]);
    let n = point[1] - m * point[0];
    return { point, velocity, m, n };
  });
  let result = 0;
  for (let i = 0; i < hails.length; i++) {
    for (let j = i + 1; j < hails.length; j++) {
      let { m: m1, n: n1 } = hails[i];
      let { m: m2, n: n2 } = hails[j];
      let x = (n2 - n1) / (m1 - m2);
      let y = m1 * x + n1;
      if (x > min && x < max && y > min && y < max) {
        if ((x - hails[i].point[0]) / hails[i].velocity[0] < 0) continue;
        if ((x - hails[j].point[0]) / hails[j].velocity[0] < 0) continue;
        result++;
      }
    }
  }
  return result;
}

export async function part2(input) {
  const hails = parse(input);

  const { Context } = await init();
  const { Solver, Int } = Context('main');
  const solver = new Solver();
  const rp = [Int.const('rpx'), Int.const('rpy'), Int.const('rpz')];
  const rv = [Int.const('rvx'), Int.const('rvy'), Int.const('rvz')];
  for (let i = 0; i < 3; i++) {
    const { point: p, velocity: v } = hails[i];
    const t = Int.const(`t${i}`);
    solver.add(t.mul(v[0]).add(p[0]).eq(t.mul(rv[0]).add(rp[0])));
    solver.add(t.mul(v[1]).add(p[1]).eq(t.mul(rv[1]).add(rp[1])));
    solver.add(t.mul(v[2]).add(p[2]).eq(t.mul(rv[2]).add(rp[2])));
  }
  if ((await solver.check()) === 'sat') {
    const model = solver.model();
    const result = model.eval(rp[0].add(rp[1]).add(rp[2])).toString();
    return +result;
  }
}
