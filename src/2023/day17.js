function key({ x, y, direction, lastTurn }) {
  return `${x},${y},${direction},${lastTurn}`;
}

function getNext(current, map, visited) {
  const next = [];
  const { x, y, total, direction, lastTurn } = current;
  if (lastTurn < 3) {
    if (direction === 'right')
      next.push({ x: x + 1, y, direction: 'right', lastTurn: lastTurn + 1 });
    if (direction === 'left')
      next.push({ x: x - 1, y, direction: 'left', lastTurn: lastTurn + 1 });
    if (direction === 'up')
      next.push({ x, y: y - 1, direction: 'up', lastTurn: lastTurn + 1 });
    if (direction === 'down')
      next.push({ x, y: y + 1, direction: 'down', lastTurn: lastTurn + 1 });
  }
  if (direction === 'right') {
    next.push({ x, y: y - 1, direction: 'up', lastTurn: 1 });
    next.push({ x, y: y + 1, direction: 'down', lastTurn: 1 });
  }
  if (direction === 'left') {
    next.push({ x, y: y - 1, direction: 'up', lastTurn: 1 });
    next.push({ x, y: y + 1, direction: 'down', lastTurn: 1 });
  }
  if (direction === 'up') {
    next.push({ x: x - 1, y, direction: 'left', lastTurn: 1 });
    next.push({ x: x + 1, y, direction: 'right', lastTurn: 1 });
  }
  if (direction === 'down') {
    next.push({ x: x - 1, y, direction: 'left', lastTurn: 1 });
    next.push({ x: x + 1, y, direction: 'right', lastTurn: 1 });
  }
  return next
    .filter(({ x, y }) => map[y]?.[x] !== undefined)
    .map(n => ({ ...n, total: total + map[n.y][n.x] }))
    .filter(n => !visited.has(key(n)) || visited.get(key(n)).total > n.total);
}

function getNext2(current, map, visited) {
  const next = [];
  const { x, y, total, direction, lastTurn } = current;
  if (lastTurn < 4) {
    if (direction === 'right')
      next.push({ x: x + 1, y, direction: 'right', lastTurn: lastTurn + 1 });
    if (direction === 'left')
      next.push({ x: x - 1, y, direction: 'left', lastTurn: lastTurn + 1 });
    if (direction === 'up')
      next.push({ x, y: y - 1, direction: 'up', lastTurn: lastTurn + 1 });
    if (direction === 'down')
      next.push({ x, y: y + 1, direction: 'down', lastTurn: lastTurn + 1 });
  } else {
    if (lastTurn < 10) {
      if (direction === 'right')
        next.push({ x: x + 1, y, direction: 'right', lastTurn: lastTurn + 1 });
      if (direction === 'left')
        next.push({ x: x - 1, y, direction: 'left', lastTurn: lastTurn + 1 });
      if (direction === 'up')
        next.push({ x, y: y - 1, direction: 'up', lastTurn: lastTurn + 1 });
      if (direction === 'down')
        next.push({ x, y: y + 1, direction: 'down', lastTurn: lastTurn + 1 });
    }
    if (direction === 'right') {
      next.push({ x, y: y - 1, direction: 'up', lastTurn: 1 });
      next.push({ x, y: y + 1, direction: 'down', lastTurn: 1 });
    }
    if (direction === 'left') {
      next.push({ x, y: y - 1, direction: 'up', lastTurn: 1 });
      next.push({ x, y: y + 1, direction: 'down', lastTurn: 1 });
    }
    if (direction === 'up') {
      next.push({ x: x - 1, y, direction: 'left', lastTurn: 1 });
      next.push({ x: x + 1, y, direction: 'right', lastTurn: 1 });
    }
    if (direction === 'down') {
      next.push({ x: x - 1, y, direction: 'left', lastTurn: 1 });
      next.push({ x: x + 1, y, direction: 'right', lastTurn: 1 });
    }
  }
  return next
    .filter(({ x, y }) => map[y]?.[x] !== undefined)
    .map(n => ({ ...n, total: total + map[n.y][n.x] }))
    .filter(n => !visited.has(key(n)) || visited.get(key(n)).total > n.total);
}

export function part1(input) {
  const map = input.split('\n').map(line => line.split('').map(Number));
  const queue = [{ x: 0, y: 0, total: 0, direction: 'right', lastTurn: 0 }];
  const visited = new Map();
  visited.set(key(queue[0]), queue[0]);
  let min = Infinity;
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === map[0].length - 1 && current.y === map.length - 1) {
      min = Math.min(min, current.total);
      continue;
    }
    if (current.total >= min) continue;
    if (visited.get(key(current)).total < current.total) continue;
    const next = getNext(current, map, visited);
    next.forEach(n => visited.set(key(n), n));
    queue.push(...next);
    queue.sort((a, b) => a.x + a.y - (b.x + b.y));
  }
  return min;
}

export function part2(input) {
  const map = input.split('\n').map(line => line.split('').map(Number));
  const queue = [{ x: 0, y: 0, total: 0, direction: 'right', lastTurn: 0 }];
  const visited = new Map();
  visited.set(key(queue[0]), queue[0]);
  let min = Infinity;
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === map[0].length - 1 && current.y === map.length - 1) {
      if (current.lastTurn < 4) {
        // console.log('hmmm', current.total);
        continue;
      }
      min = Math.min(min, current.total);
      continue;
    }
    if (current.total >= min) continue;
    if (visited.get(key(current)).total < current.total) continue;
    const next = getNext2(current, map, visited);
    next.forEach(n => visited.set(key(n), n));
    queue.push(...next);
    queue.sort((a, b) => a.x + a.y - (b.x + b.y));
  }
  return min;
}
