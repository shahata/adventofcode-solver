const R = { x: +1, y: 0, d: 'right' };
const L = { x: -1, y: 0, d: 'left' };
const U = { x: 0, y: -1, d: 'up' };
const D = { x: 0, y: +1, d: 'down' };
const answers = {
  '.': { right: [R], left: [L], up: [U], down: [D] },
  '/': { right: [U], left: [D], up: [R], down: [L] },
  '\\': { right: [D], left: [U], up: [L], down: [R] },
  '-': { right: [R], left: [L], up: [L, R], down: [L, R] },
  '|': { right: [U, D], left: [U, D], up: [U], down: [D] },
};

export function part1(input, start = { x: 0, y: 0, d: 'right' }) {
  const init = cell => ({ cell, beams: [] });
  const map = input.split('\n').map(line => line.split('').map(init));
  const queue = [start];
  while (queue.length > 0) {
    const { x, y, d } = queue.shift();
    const next = answers[map[y][x].cell][d]
      .map(a => ({ x: x + a.x, y: y + a.y, d: a.d }))
      .filter(({ x, y, d }) => map[y]?.[x]?.beams.includes(d) === false);
    map[y][x].beams.push(d);
    queue.push(...next);
  }
  return map.flatMap(lines => lines.filter(x => x.beams.length > 0)).length;
}

export function part2(input) {
  const map = input.split('\n').map(line => line.split(''));
  let max = 0;
  for (let x = 0; x < map[0].length; x++) {
    max = Math.max(max, part1(input, { x, y: 0, d: 'down' }));
    max = Math.max(max, part1(input, { x, y: map.length - 1, d: 'up' }));
  }
  for (let y = 0; y < map.length; y++) {
    max = Math.max(max, part1(input, { x: 0, y, d: 'right' }));
    max = Math.max(max, part1(input, { x: map[0].length - 1, y, d: 'left' }));
  }
  return max;
}
