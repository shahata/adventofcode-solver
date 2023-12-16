function getNextSteps(map, x, y, d) {
  const RIGHT = { x: x + 1, y: y, d: 'right' };
  const LEFT = { x: x - 1, y: y, d: 'left' };
  const UP = { x: x, y: y - 1, d: 'up' };
  const DOWN = { x: x, y: y + 1, d: 'down' };

  if (map[y][x].c === '-' && (d === 'up' || d === 'down')) {
    return [LEFT, RIGHT];
  } else if (map[y][x].c === '|' && (d === 'right' || d === 'left')) {
    return [UP, DOWN];
  } else if (map[y][x].c === '\\') {
    if (d === 'right') return [DOWN];
    if (d === 'left') return [UP];
    if (d === 'up') return [LEFT];
    if (d === 'down') return [RIGHT];
  } else if (map[y][x].c === '/') {
    if (d === 'right') return [UP];
    if (d === 'left') return [DOWN];
    if (d === 'up') return [RIGHT];
    if (d === 'down') return [LEFT];
  } else {
    if (d === 'right') return [RIGHT];
    if (d === 'left') return [LEFT];
    if (d === 'up') return [UP];
    if (d === 'down') return [DOWN];
  }
}

export function part1(input, start = { x: 0, y: 0, d: 'right' }) {
  const map = input
    .split('\n')
    .map(line => line.split('').map(c => ({ c, l: [] })));
  const queue = [start];
  while (queue.length > 0) {
    const { x, y, d } = queue.shift();
    const next = getNextSteps(map, x, y, d).filter(
      ({ x, y, d }) => map[y]?.[x]?.l.includes(d) === false,
    );
    map[y][x].l.push(d);
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
