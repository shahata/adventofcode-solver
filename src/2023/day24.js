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

// px0 + vx0 t0 = pxr + vxr t0
// py0 + vy0 t0 = pyr + vyr t0

// t0 = (pxr - px0) / (vx0 - vxr)
// t0 = (pyr - py0) / (vy0 - vyr)

// (pxr - px0) / (vx0 - vxr) = (pyr - py0) / (vy0 - vyr)
// (pxr - px0) (vy0 - vyr) = (pyr - py0) (vx0 - vxr)
// pxr vy0 - pxr vyr - px0 vy0 + px0 vyr = pyr vx0 - pyr vxr - py0 vx0 + py0 vxr

// pxr vy0 - pyr vx0 - vxr py0 + vyr px0 + pyr vxr - pxr vyr = px0 vy0 - py0 vx0
// -
// pxr vyN - pyr vxN - vxr pyN + vyr pxN + pyr vxr - pxr vyr = pxN vyN - pyN vxN
// =
// pxr (vy0 - vyN) + pyr (vxN - vx0) + vxr (pyN - py0) + vyr (px0 - pxN) = px0 vy0 - py0 vx0 - pxN vyN + pyN vxN

// pxr (vy0 - vyN) + pyr (vxN - vx0) + pzr (0) + vxr (pyN - py0) + vyr (px0 - pxN) + vzr (0) = px0 vy0 - py0 vx0 - pxN vyN + pyN vxN
// pxr (vz0 - vzN) + pyr (0) + pzr (vxN - vx0) + vxr (pzN - pz0) + vyr (0) + vzr (px0 - pxN) = px0 vz0 - pz0 vx0 - pxN vzN + pzN vxN

function add(A, B, hails, i) {
  const [px0, py0, pz0, vx0, vy0, vz0] = hails[0];
  const [pxN, pyN, pzN, vxN, vyN, vzN] = hails[i];
  A.push([vy0 - vyN, vxN - vx0, 0n, pyN - py0, px0 - pxN, 0n]);
  B.push(px0 * vy0 - py0 * vx0 - pxN * vyN + pyN * vxN);
  A.push([vz0 - vzN, 0n, vxN - vx0, pzN - pz0, 0n, px0 - pxN]);
  B.push(px0 * vz0 - pz0 * vx0 - pxN * vzN + pzN * vxN);
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

function solve(hails) {
  const A = [];
  const B = [];
  for (let i = 1; i <= 4; i++) add(A, B, hails, i);
  const [pxr, pyr, pzr] = cramersRule(A.slice(0, 6), B.slice(0, 6));
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
      //just a hack to avoid parallel hailstones
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
