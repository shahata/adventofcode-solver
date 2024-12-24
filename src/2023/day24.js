// 1) px0 + vx0 t0 = pxr + vxr t0
// 2) py0 + vy0 t0 = pyr + vyr t0
// 1) t0 = (pxr - px0) / (vx0 - vxr)
// 2) t0 = (pyr - py0) / (vy0 - vyr)
//
// (pxr - px0) / (vx0 - vxr) = (pyr - py0) / (vy0 - vyr)
// (pxr - px0) (vy0 - vyr) = (pyr - py0) (vx0 - vxr)
// pxr vy0 - pxr vyr - px0 vy0 + px0 vyr = pyr vx0 - pyr vxr - py0 vx0 + py0 vxr
//
// pxr vy0 - pyr vx0 - vxr py0 + vyr px0 + pyr vxr - pxr vyr = px0 vy0 - py0 vx0
// -
// pxr vyN - pyr vxN - vxr pyN + vyr pxN + pyr vxr - pxr vyr = pxN vyN - pyN vxN
// =
// pxr (vy0 - vyN) + pyr (vxN - vx0) + vxr (pyN - py0) + vyr (px0 - pxN) = px0 vy0 - py0 vx0 - pxN vyN + pyN vxN
//
// 1) pxr (vy0 - vyN) + pyr (vxN - vx0) + pzr (0) + vxr (pyN - py0) + vyr (px0 - pxN) + vzr (0) = px0 vy0 - py0 vx0 - pxN vyN + pyN vxN
// 2) pxr (vz0 - vzN) + pyr (0) + pzr (vxN - vx0) + vxr (pzN - pz0) + vyr (0) + vzr (px0 - pxN) = px0 vz0 - pz0 vx0 - pxN vzN + pzN vxN
function add(A, B, hails, n) {
  let [px0, py0, pz0, vx0, vy0, vz0] = hails[0];
  let [pxN, pyN, pzN, vxN, vyN, vzN] = hails[n];
  A.push([vy0 - vyN, vxN - vx0, 0n, pyN - py0, px0 - pxN, 0n]);
  B.push(px0 * vy0 - py0 * vx0 - pxN * vyN + pyN * vxN);
  A.push([vz0 - vzN, 0n, vxN - vx0, pzN - pz0, 0n, px0 - pxN]);
  B.push(px0 * vz0 - pz0 * vx0 - pxN * vzN + pzN * vxN);
}

function det(m) {
  if (m.length === 0) return 1n;
  let [l, ...r] = m;
  r = l.map((n, i) => n * det(r.map(row => row.toSpliced(i, 1))));
  return r.reduce((a, b, i) => (i % 2 ? a - b : a + b), 0n);
}

function cramer(A, B) {
  let detA = det(A);
  return A.map((_, i) => det(A.map((r, j) => r.toSpliced(i, 1, B[j]))) / detA);
}

// 1) px1 + vx1 t1 = px2 + vx2 t2
// 2) py1 + vy1 t1 = py2 + vy2 t2
// 1) t1 vx1 - t2 vx2 = px2 - px1
// 2) t1 vy1 - t2 vy2 = py2 - py1
export function part1(input, min = 2e14, max = 4e14) {
  let hails = input.split("\n").map(line => line.match(/-?\d+/g).map(BigInt));
  let result = 0;
  for (let i = 0; i < hails.length; i++) {
    for (let j = i + 1; j < hails.length; j++) {
      let [px1, py1, , vx1, vy1] = hails[i];
      let [px2, py2, , vx2, vy2] = hails[j];
      let A = [
        [vx1, -vx2],
        [vy1, -vy2],
      ];
      let B = [px2 - px1, py2 - py1];
      if (det(A) === 0n) continue;
      let [t1, t2] = cramer(A, B);
      let x = px1 + vx1 * t1;
      let y = py1 + vy1 * t1;
      if (t1 > 0 && t2 > 0 && x > min && x < max && y > min && y < max) {
        result++;
      }
    }
  }
  return result;
}

export function part2(input) {
  let hails = input.split("\n").map(line => line.match(/-?\d+/g).map(BigInt));
  let A = [];
  let B = [];
  for (let i = 1; i <= 3; i++) add(A, B, hails, i);
  let [pxr, pyr, pzr] = cramer(A, B);
  return pxr + pyr + pzr;
}

// import { init } from 'z3-solver';
// export async function part2(input) {
//   let hails = parse(input);
//   let { Context } = await init();
//   let { Solver, Int } = Context('main');
//   let solver = new Solver();
//   let rp = [Int.const('rpx'), Int.const('rpy'), Int.const('rpz')];
//   let rv = [Int.const('rvx'), Int.const('rvy'), Int.const('rvz')];
//   for (let i = 0; i < hails.length; i++) {
//     let { point: p, velocity: v } = hails[i];
//     let t = Int.const(`t${i}`);
//     solver.add(t.gt(0));
//     solver.add(t.mul(v[0]).add(p[0]).eq(t.mul(rv[0]).add(rp[0])));
//     solver.add(t.mul(v[1]).add(p[1]).eq(t.mul(rv[1]).add(rp[1])));
//     solver.add(t.mul(v[2]).add(p[2]).eq(t.mul(rv[2]).add(rp[2])));
//   }
//   if ((await solver.check()) === 'sat') {
//     let model = solver.model();
//     let result = model.eval(rp[0].add(rp[1]).add(rp[2])).toString();
//     return +result;
//   }
// }
