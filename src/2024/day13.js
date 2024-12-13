// px = a * ax + b * bx
// py = a * ay + b * by
//
// b = (px - a * ax) / bx
// py = a * ay + (px - a * ax) / bx * by
// py = a * ay + px * by / bx - a * ax * by / bx
// a * ay + px * by / bx - a * ax * by / bx - py = 0
// a * ay - a * ax * by / bx = py - px * by / bx
// a * (ay - ax * by / bx) = py - px * by / bx
// a = (py - px * by / bx) / (ay - ax * by / bx)
function solve({ ax, ay, bx, by, px, py }) {
  const b = (py * ax - px * ay) / (by * ax - bx * ay);
  const a = (px - b * bx) / ax;
  if (Math.floor(a) === a && Math.floor(b) === b) return a * 3 + b;
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
