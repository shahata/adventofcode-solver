function getNext(current, map, minSteps, maxSteps) {
  const next = [];
  const { x, y, total, d, s } = current;
  if (s < maxSteps) {
    if (d === 'right') next.push({ x: x + 1, y, d: 'right', s: s + 1 });
    if (d === 'left') next.push({ x: x - 1, y, d: 'left', s: s + 1 });
    if (d === 'up') next.push({ x, y: y - 1, d: 'up', s: s + 1 });
    if (d === 'down') next.push({ x, y: y + 1, d: 'down', s: s + 1 });
  }
  if (s >= minSteps && (d === 'right' || d === 'left')) {
    if (s >= minSteps) next.push({ x, y: y - 1, d: 'up', s: 1 });
    if (s >= minSteps) next.push({ x, y: y + 1, d: 'down', s: 1 });
  }
  if (s >= minSteps && (d === 'up' || d === 'down')) {
    if (s >= minSteps) next.push({ x: x - 1, y, d: 'left', s: 1 });
    if (s >= minSteps) next.push({ x: x + 1, y, d: 'right', s: 1 });
  }
  return next
    .filter(({ x, y }) => map[y]?.[x] !== undefined)
    .map(n => ({ ...n, total: total + map[n.y][n.x] }));
}

export function part1(input, minSteps = 0, maxSteps = 3) {
  const map = input.split('\n').map(line => line.split('').map(Number));
  const queue = [{ x: 0, y: 0, total: 0, d: 'right', s: 0 }];
  const visited = new Map();
  const key = ({ x, y, d, s }) => `${x},${y},${d},${s}`;
  let min = Infinity;
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === map[0].length - 1 && current.y === map.length - 1) {
      if (current.s < minSteps) continue;
      min = Math.min(min, current.total);
      continue;
    }
    if (current.total >= min) continue;
    const next = getNext(current, map, minSteps, maxSteps).filter(
      n => !visited.has(key(n)) || visited.get(key(n)).total > n.total,
    );
    next.forEach(n => visited.set(key(n), n));
    queue.push(...next);
    queue.sort((a, b) => a.x + a.y - (b.x + b.y) || a.total - b.total);
  }
  return min;
}

export function part2(input) {
  return part1(input, 4, 10);
}
