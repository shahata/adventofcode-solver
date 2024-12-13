// px = a * ax + b * bx
// py = a * ay + b * by
//
// b = (px - a * ax) / bx
// py = a * ay + (px - a * ax) / bx * by
// py = a * ay + px * by / bx - a * ax * by / bx
// py - px * by / bx = a * ay - a * ax * by / bx
// py * bx - px * by = a * ay * bx - a * ax * by
// py * bx - px * by = a * (ay * bx - ax * by)
//
// a = (py * bx - px * by) / (ay * bx - ax * by)
// b = (px - a * ax) / bx
function solve({ ax, ay, bx, by, px, py }) {
  const a = (py * bx - px * by) / (ay * bx - ax * by);
  const b = (px - a * ax) / bx;
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
