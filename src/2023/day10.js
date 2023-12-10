function solve(input) {
  const map = input.split('\n').map(line => line.split(''));
  const y = map.findIndex(line => line.includes('S'));
  const x = map[y].findIndex(c => c === 'S');
  const queue = [{ x, y, steps: 0 }];
  let visited = new Set();
  let max = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    max = Math.max(max, current.steps);
    const neighbors = {
      UP: { x: current.x, y: current.y - 1, steps: current.steps + 1 },
      DOWN: { x: current.x, y: current.y + 1, steps: current.steps + 1 },
      LEFT: { x: current.x - 1, y: current.y, steps: current.steps + 1 },
      RIGHT: { x: current.x + 1, y: current.y, steps: current.steps + 1 },
    };
    let next = [];
    switch (map[current.y][current.x]) {
      case 'S':
        map[current.y][current.x] = '$';
        if ('|7F'.includes(map[neighbors.UP.y]?.[neighbors.UP.x]))
          next.push(neighbors.UP);
        if ('|LJ'.includes(map[neighbors.DOWN.y]?.[neighbors.DOWN.x]))
          next.push(neighbors.DOWN);
        if ('-J7'.includes(map[neighbors.RIGHT.y]?.[neighbors.RIGHT.x]))
          next.push(neighbors.RIGHT);
        if ('-LF'.includes(map[neighbors.LEFT.y]?.[neighbors.LEFT.x]))
          next.push(neighbors.LEFT);
        break;
      case '|':
        next.push(neighbors.UP);
        next.push(neighbors.DOWN);
        break;
      case '-':
        next.push(neighbors.LEFT);
        next.push(neighbors.RIGHT);
        break;
      case 'L':
        next.push(neighbors.UP);
        next.push(neighbors.RIGHT);
        break;
      case 'J':
        next.push(neighbors.UP);
        next.push(neighbors.LEFT);
        break;
      case '7':
        next.push(neighbors.DOWN);
        next.push(neighbors.LEFT);
        break;
      case 'F':
        next.push(neighbors.DOWN);
        next.push(neighbors.RIGHT);
        break;
      case '$':
        break;
      default:
        throw new Error('unexpected');
    }
    next = next.filter(({ x, y }) => !visited.has(`${x},${y}`));
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    queue.push(...next);
  }
  return { max, map, visited };
}
export function part1(input) {
  const { max } = solve(input);
  return max;
}

function flood(map, x, y) {
  let visited = new Set();
  let queue = [{ x, y }];
  let trapped = true;
  visited.add(`${x},${y}`);
  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = [
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
    ];
    neighbors.forEach(({ x, y }) => {
      if (!map[y] || !map[y][x]) trapped = false;
    });
    let next = neighbors.filter(
      ({ x, y }) => map[y]?.[x] === '.' && !visited.has(`${x},${y}`),
    );
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    queue.push(...next);
  }
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(`${x},${y}`)) map[y][x] = trapped ? 'I' : 'O';
    }
  }
  return trapped ? visited.size : 0;
}

export function part2(input) {
  const { map, visited } = solve(input);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!visited.has(`${x},${y}`)) map[y][x] = '.';
    }
  }
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '.') {
        const trapped = flood(map, x, y);
        if (trapped > 0) {
          sum += trapped;
        }
      }
    }
  }
  return sum; //?
}
