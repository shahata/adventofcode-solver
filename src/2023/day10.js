const dic = {
  '|': ['UP', 'DOWN'],
  '-': ['LEFT', 'RIGHT'],
  'L': ['UP', 'RIGHT'],
  'J': ['UP', 'LEFT'],
  '7': ['DOWN', 'LEFT'],
  'F': ['DOWN', 'RIGHT'],
};

function start(map, { UP, DOWN, LEFT, RIGHT }) {
  const S = [];
  if ('|7F'.includes(map[UP.y]?.[UP.x])) S.push('UP');
  if ('|LJ'.includes(map[DOWN.y]?.[DOWN.x])) S.push('DOWN');
  if ('-LF'.includes(map[LEFT.y]?.[LEFT.x])) S.push('LEFT');
  if ('-J7'.includes(map[RIGHT.y]?.[RIGHT.x])) S.push('RIGHT');
  return Object.keys(dic).find(key => dic[key].join('_') === S.join('_'));
}

function solve(input) {
  const map = input.split('\n').map(line => line.split(''));
  const y = map.findIndex(line => line.includes('S'));
  const x = map[y].findIndex(c => c === 'S');
  const queue = [{ x, y, steps: 0 }];
  const visited = new Set([`${x},${y}`]);
  let max = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = {
      UP: { x: current.x, y: current.y - 1, steps: current.steps + 1 },
      DOWN: { x: current.x, y: current.y + 1, steps: current.steps + 1 },
      LEFT: { x: current.x - 1, y: current.y, steps: current.steps + 1 },
      RIGHT: { x: current.x + 1, y: current.y, steps: current.steps + 1 },
    };
    if (map[current.y][current.x] === 'S') {
      map[current.y][current.x] = start(map, neighbors);
    }
    let next = dic[map[current.y][current.x]].map(dir => neighbors[dir]);
    next = next.filter(({ x, y }) => !visited.has(`${x},${y}`));
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    max = Math.max(max, current.steps);
    queue.push(...next);
  }
  return { max, map, visited };
}

function zoomin(map) {
  const big = [];
  for (let yi = 0; yi < map.length; yi++) {
    const line1 = [];
    const line2 = [];
    const line3 = [];
    for (let xi = 0; xi < map[yi].length; xi++) {
      const [UP, DOWN, LEFT, RIGHT] = ['UP', 'DOWN', 'LEFT', 'RIGHT'].map(x =>
        (dic[map[yi][xi]] || []).includes(x) ? '#' : '.',
      );
      line1.push('.', UP, '.');
      line2.push(LEFT, map[yi][xi], RIGHT);
      line3.push('.', DOWN, '.');
    }
    big.push(line1, line2, line3);
  }
  return big;
}

function zoomout(map) {
  const small = [];
  for (let y = 0; y < map.length; y += 3) {
    const line = [];
    for (let x = 0; x < map[y].length; x += 3) line.push(map[y + 1][x + 1]);
    small.push(line);
  }
  return small;
}

function flood(map, x, y) {
  const visited = new Set([`${x},${y}`]);
  const queue = [{ x, y }];
  let trapped = true;
  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = [
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
    ];
    const next = neighbors.filter(({ x, y }) => {
      if (!map[y] || !map[y][x]) trapped = false;
      return map[y]?.[x] === '.' && !visited.has(`${x},${y}`);
    });
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    queue.push(...next);
  }
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(`${x},${y}`)) map[y][x] = trapped ? 'I' : 'O';
    }
  }
}

export function part1(input) {
  const { max } = solve(input);
  return max;
}

export function part2(input) {
  let { map, visited } = solve(input);
  map = map.map((line, y) => {
    return line.map((c, x) => (visited.has(`${x},${y}`) ? c : '.'));
  });
  const big = zoomin(map);
  for (let y = 0; y < big.length; y++) {
    for (let x = 0; x < big[y].length; x++) {
      if (big[y][x] === '.') flood(big, x, y);
    }
  }
  const small = zoomout(big);
  return small.flat().filter(c => c === 'I').length;
}
