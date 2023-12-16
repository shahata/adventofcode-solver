export function part1(input, start = { x: 0, y: 0, d: 'right' }) {
  const map = input
    .split('\n')
    .map(line => line.split('').map(c => ({ c, l: [] })));
  const queue = [start];
  while (queue.length > 0) {
    let next = [];
    const { x, y, d } = queue.shift();
    const RIGHT = { x: x + 1, y: y, d: 'right' };
    const LEFT = { x: x - 1, y: y, d: 'left' };
    const UP = { x: x, y: y - 1, d: 'up' };
    const DOWN = { x: x, y: y + 1, d: 'down' };

    map[y][x].l.push(d);
    if (map[y][x].c === '-' && (d === 'up' || d === 'down')) {
      next.push(LEFT, RIGHT);
    } else if (map[y][x].c === '|' && (d === 'right' || d === 'left')) {
      next.push(UP, DOWN);
    } else if (map[y][x].c === '\\') {
      if (d === 'right') next.push(DOWN);
      if (d === 'left') next.push(UP);
      if (d === 'up') next.push(LEFT);
      if (d === 'down') next.push(RIGHT);
    } else if (map[y][x].c === '/') {
      if (d === 'right') next.push(UP);
      if (d === 'left') next.push(DOWN);
      if (d === 'up') next.push(RIGHT);
      if (d === 'down') next.push(LEFT);
    } else {
      if (d === 'right') next.push(RIGHT);
      if (d === 'left') next.push(LEFT);
      if (d === 'up') next.push(UP);
      if (d === 'down') next.push(DOWN);
    }
    next = next.filter(({ x, y, d }) => map[y]?.[x]?.l.includes(d) === false);
    queue.push(...next);
  }
  return map.flatMap(lines => lines.filter(c => c.l.length > 0)).length;
}

export function part2(input) {
  const map = input.split('\n').map(line => line.split(''));
  let max = 0;
  for (let x = 0; x < map[0].length; x++) {
    max = Math.max(max, part1(input, { x, y: 0, d: 'down' }));
  }
  for (let x = 0; x < map[0].length; x++) {
    max = Math.max(max, part1(input, { x, y: map.length - 1, d: 'up' }));
  }
  for (let y = 0; y < map.length; y++) {
    max = Math.max(max, part1(input, { x: 0, y, d: 'right' }));
  }
  for (let y = 0; y < map.length; y++) {
    max = Math.max(max, part1(input, { x: map[0].length - 1, y, d: 'left' }));
  }

  return max;
}
