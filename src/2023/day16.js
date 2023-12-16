export function part1(input, start = { x: 0, y: 0, d: 'right' }) {
  const map = input
    .split('\n')
    .map(line => line.split('').map(c => ({ c, l: [] })));
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    map[current.y][current.x].l.push(current.d);
    let next = [];
    if (
      map[current.y][current.x].c === '.' ||
      (map[current.y][current.x].c === '|' && current.d === 'up') ||
      (map[current.y][current.x].c === '|' && current.d === 'down') ||
      (map[current.y][current.x].c === '-' && current.d === 'right') ||
      (map[current.y][current.x].c === '-' && current.d === 'left')
    ) {
      if (current.d === 'right') {
        next.push({ x: current.x + 1, y: current.y, d: 'right' });
      } else if (current.d === 'left') {
        next.push({ x: current.x - 1, y: current.y, d: 'left' });
      } else if (current.d === 'up') {
        next.push({ x: current.x, y: current.y - 1, d: 'up' });
      } else if (current.d === 'down') {
        next.push({ x: current.x, y: current.y + 1, d: 'down' });
      }
    } else if (
      (map[current.y][current.x].c === '-' && current.d === 'up') ||
      (map[current.y][current.x].c === '-' && current.d === 'down')
    ) {
      next.push({ x: current.x - 1, y: current.y, d: 'left' });
      next.push({ x: current.x + 1, y: current.y, d: 'right' });
    } else if (
      (map[current.y][current.x].c === '|' && current.d === 'right') ||
      (map[current.y][current.x].c === '|' && current.d === 'left')
    ) {
      next.push({ x: current.x, y: current.y - 1, d: 'up' });
      next.push({ x: current.x, y: current.y + 1, d: 'down' });
    } else if (map[current.y][current.x].c === '\\') {
      if (current.d === 'right') {
        next.push({ x: current.x, y: current.y + 1, d: 'down' });
      } else if (current.d === 'left') {
        next.push({ x: current.x, y: current.y - 1, d: 'up' });
      } else if (current.d === 'up') {
        next.push({ x: current.x - 1, y: current.y, d: 'left' });
      } else if (current.d === 'down') {
        next.push({ x: current.x + 1, y: current.y, d: 'right' });
      }
    } else if (map[current.y][current.x].c === '/') {
      if (current.d === 'right') {
        next.push({ x: current.x, y: current.y - 1, d: 'up' });
      } else if (current.d === 'left') {
        next.push({ x: current.x, y: current.y + 1, d: 'down' });
      } else if (current.d === 'up') {
        next.push({ x: current.x + 1, y: current.y, d: 'right' });
      } else if (current.d === 'down') {
        next.push({ x: current.x - 1, y: current.y, d: 'left' });
      }
    }
    next = next.filter(({ x, y, d }) => {
      if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) return false;
      return !map[y][x].l.includes(d);
    });
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
