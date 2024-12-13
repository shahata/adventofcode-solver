// Given equations:
// px = a * ax + b * bx
// py = a * ay + b * by
//
// Solve for a and b:
// 1) Multiply first equation by by: px * by = a * ax * by + b * bx * by
// 2) Multiply second equation by bx: py * bx = a * ay * bx + b * by * bx
// 3) Subtract equations: px * by - py * bx = a * (ax * by - ay * bx)
// 4) Therefore: a = (px * by - py * bx) / (ax * by - ay * bx)
// 5) Substitute back to get b: b = (px - a * ax) / bx

function solve({ ax, ay, bx, by, px, py }) {
  const a = (px * by - py * bx) / (ax * by - ay * bx);
  const b = (px - a * ax) / bx;
  if (Number.isInteger(a) && Number.isInteger(b)) return a * 3 + b;
  else return 0;
}

function parse(input) {
  return input.split("\n\n").map(group => {
    const [a, b, prize] = group.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, px, py] = prize.match(/X=(\d+), Y=(\d+)/);
    return { ax: +ax, ay: +ay, bx: +bx, by: +by, px: +px, py: +py };
  });
}

export function part1(input) {
  let machines = parse(input);
  return machines.map(solve).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let machines = parse(input);
  machines = machines.map(m => ({ ...m, px: m.px + 10000000000000 }));
  machines = machines.map(m => ({ ...m, py: m.py + 10000000000000 }));
  return machines.map(solve).reduce((a, b) => a + b, 0);
}
