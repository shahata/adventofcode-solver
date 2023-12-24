import { init } from 'z3-solver';

export function part1(input, min = 200000000000000, max = 400000000000000) {
  let hails = input.split('\n').map(line => {
    let [point, velocity] = line.split(' @ ');
    point = point.split(', ').map(n => +n);
    velocity = velocity.split(', ').map(n => +n);
    return { point, velocity };
  });
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
        if ((x - hails[i].point[0]) * hails[i].velocity[0] < 0) {
          continue;
        }
        if ((x - hails[j].point[0]) * hails[j].velocity[0] < 0) {
          continue;
        }
        result++;
      }
    }
  }
  return result;
}

export async function part2(input) {
  let hails = input.split('\n').map(line => {
    let [point, velocity] = line.split(' @ ');
    point = point.split(', ').map(n => +n);
    velocity = velocity.split(', ').map(n => +n);
    return { point, velocity };
  });

  const { Context } = await init();
  const { Solver, Int } = Context('main');
  const solver = new Solver();
  const r = [Int.const('rx'), Int.const('ry'), Int.const('rz')];
  const rv = [Int.const('rvx'), Int.const('rvy'), Int.const('rvz')];
  for (let i = 0; i < hails.length; i++) {
    let { point, velocity } = hails[i];
    const t = Int.const(`t${i}`);
    solver.add(t.ge(0));
    for (let j = 0; j < 3; j++) {
      solver.add(t.mul(velocity[j]).add(point[j]).eq(t.mul(rv[j]).add(r[j])));
    }
  }
  if ((await solver.check()) === 'sat') {
    const model = solver.model();
    const result = model.eval(r[0].add(r[1]).add(r[2])).toString();
    return +result;
  }
}
