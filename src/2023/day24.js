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

function det(m) {
  if (m.length === 0) return 1n;
  let [l, ...r] = m;
  r = l.map((n, i) => n * det(r.map(row => row.toSpliced(i, 1))));
  return r.reduce((a, b, i) => (i % 2 === 0 ? a + b : a - b), 0n);
}

function cramersRule(A, B) {
  const detA = det(A);
  return B.map((_, i) => det(A.map((r, j) => r.toSpliced(i, 1, B[j]))) / detA);
}

// px0 + vx0 t0 = pxr + vxr t0
// py0 + vy0 t0 = pyr + vyr t0

// t0 = (pxr - px0) / (vx0 - vxr)
// t0 = (pyr - py0) / (vy0 - vyr)

// (pxr - px0) / (vx0 - vxr) = (pyr - py0) / (vy0 - vyr)
// (pxr - px0) (vy0 - vyr) = (pyr - py0) (vx0 - vxr)
// pxr vy0 - pxr vyr - px0 vy0 + px0 vyr = pyr vx0 - pyr vxr - py0 vx0 + py0 vxr

// pxr vy0 - pyr vx0 - vxr py0 + vyr px0 + pyr vxr - pxr vyr = px0 vy0 - py0 vx0
// pxr vy1 - pyr vx1 - vxr py1 + vyr px1 + pyr vxr - pxr vyr = px1 vy1 - py1 vx1

// pxr (vy0 - vy1) + pyr (vx1 - vx0) + vxr (py1 - py0) + vyr (px0 - px1) = px0 vy0 - py0 vx0 - px1 vy1 + py1 vx1
// pxr (vy1 - vy2) + pyr (vx2 - vx1) + vxr (py2 - py1) + vyr (px1 - px2) = px1 vy1 - py1 vx1 - px2 vy2 + py2 vx2
// pxr (vy2 - vy3) + pyr (vx3 - vx2) + vxr (py3 - py2) + vyr (px2 - px3) = px2 vy2 - py2 vx2 - px3 vy3 + py3 vx3
// pxr (vy3 - vy4) + pyr (vx4 - vx3) + vxr (py4 - py3) + vyr (px3 - px4) = px3 vy3 - py3 vx3 - px4 vy4 + py4 vx4

function solve(hails) {
  const [px0, py0, pz0, vx0, vy0, vz0] = hails[0];
  const [px1, py1, pz1, vx1, vy1, vz1] = hails[1];
  const [px2, py2, , vx2, vy2] = hails[2];
  const [px3, py3, , vx3, vy3] = hails[3];
  const [px4, py4, , vx4, vy4] = hails[4];

  const A = [
    [vy0 - vy1, vx1 - vx0, py1 - py0, px0 - px1],
    [vy1 - vy2, vx2 - vx1, py2 - py1, px1 - px2],
    [vy2 - vy3, vx3 - vx2, py3 - py2, px2 - px3],
    [vy3 - vy4, vx4 - vx3, py4 - py3, px3 - px4],
  ];

  const B = [
    px0 * vy0 - py0 * vx0 - px1 * vy1 + py1 * vx1,
    px1 * vy1 - py1 * vx1 - px2 * vy2 + py2 * vx2,
    px2 * vy2 - py2 * vx2 - px3 * vy3 + py3 * vx3,
    px3 * vy3 - py3 * vx3 - px4 * vy4 + py4 * vx4,
  ];

  const [pxr, pyr, vxr] = cramersRule(A, B);

  const t0 = (pxr - px0) / (vx0 - vxr);
  const t1 = (pxr - px1) / (vx1 - vxr);
  const vzr = (pz0 - pz1 + t0 * vz0 - t1 * vz1) / (t0 - t1);
  const pzr = pz0 + t0 * (vz0 - vzr);

  return pxr + pyr + pzr;
}

export function part2(input) {
  const hails = parse(input).map(({ point, velocity }) => [
    ...point.map(n => BigInt(n)),
    ...velocity.map(n => BigInt(n)),
  ]);
  for (let i = 0; i < hails.length; i++) {
    try {
      return solve(hails.slice(i));
    } catch {
      //
    }
  }
}

// import { init } from 'z3-solver';
// export async function part2(input) {
//   const hails = parse(input);

//   const { Context } = await init();
//   const { Solver, Int } = Context('main');
//   const solver = new Solver();
//   const rp = [Int.const('rpx'), Int.const('rpy'), Int.const('rpz')];
//   const rv = [Int.const('rvx'), Int.const('rvy'), Int.const('rvz')];
//   for (let i = 0; i < hails.length; i++) {
//     const { point: p, velocity: v } = hails[i];
//     const t = Int.const(`t${i}`);
//     solver.add(t.gt(0));
//     solver.add(t.mul(v[0]).add(p[0]).eq(t.mul(rv[0]).add(rp[0])));
//     solver.add(t.mul(v[1]).add(p[1]).eq(t.mul(rv[1]).add(rp[1])));
//     solver.add(t.mul(v[2]).add(p[2]).eq(t.mul(rv[2]).add(rp[2])));
//   }
//   if ((await solver.check()) === 'sat') {
//     const model = solver.model();
//     const result = model.eval(rp[0].add(rp[1]).add(rp[2])).toString();
//     return +result;
//   }
// }
