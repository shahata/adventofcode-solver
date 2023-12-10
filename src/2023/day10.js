function start(map, UP, DOWN, LEFT, RIGHT) {
  let S = '';
  if ('|7F'.includes(map[UP.y]?.[UP.x])) S += 'U';
  if ('|LJ'.includes(map[DOWN.y]?.[DOWN.x])) S += 'D';
  if ('-LF'.includes(map[LEFT.y]?.[LEFT.x])) S += 'L';
  if ('-J7'.includes(map[RIGHT.y]?.[RIGHT.x])) S += 'R';
  if (S === 'UD') return '|';
  if (S === 'LR') return '-';
  if (S === 'UR') return 'L';
  if (S === 'UL') return 'J';
  if (S === 'DL') return '7';
  if (S === 'DR') return 'F';
}

function solve(input) {
  const map = input.split('\n').map(line => line.split(''));
  const y = map.findIndex(line => line.includes('S'));
  const x = map[y].findIndex(c => c === 'S');
  const queue = [{ x, y, steps: 0 }];
  let visited = new Set([`${x},${y}`]);
  let max = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    const UP = { x: current.x, y: current.y - 1, steps: current.steps + 1 };
    const DOWN = { x: current.x, y: current.y + 1, steps: current.steps + 1 };
    const LEFT = { x: current.x - 1, y: current.y, steps: current.steps + 1 };
    const RIGHT = { x: current.x + 1, y: current.y, steps: current.steps + 1 };
    if (map[current.y][current.x] === 'S') {
      map[current.y][current.x] = start(map, UP, DOWN, LEFT, RIGHT);
    }
    let next = [];
    if (map[current.y][current.x] === '|') next.push(UP, DOWN);
    if (map[current.y][current.x] === '-') next.push(LEFT, RIGHT);
    if (map[current.y][current.x] === 'L') next.push(UP, RIGHT);
    if (map[current.y][current.x] === 'J') next.push(UP, LEFT);
    if (map[current.y][current.x] === '7') next.push(DOWN, LEFT);
    if (map[current.y][current.x] === 'F') next.push(DOWN, RIGHT);
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
      if (map[yi][xi] === '.') {
        line1.push('.', '.', '.');
        line2.push('.', '.', '.');
        line3.push('.', '.', '.');
      } else if (map[yi][xi] === '|') {
        line1.push('.', '|', '.');
        line2.push('.', '|', '.');
        line3.push('.', '|', '.');
      } else if (map[yi][xi] === '-') {
        line1.push('.', '.', '.');
        line2.push('-', '-', '-');
        line3.push('.', '.', '.');
      } else if (map[yi][xi] === 'L') {
        line1.push('.', '|', '.');
        line2.push('.', 'L', '-');
        line3.push('.', '.', '.');
      } else if (map[yi][xi] === 'J') {
        line1.push('.', '|', '.');
        line2.push('-', 'J', '.');
        line3.push('.', '.', '.');
      } else if (map[yi][xi] === '7') {
        line1.push('.', '.', '.');
        line2.push('-', '7', '.');
        line3.push('.', '|', '.');
      } else if (map[yi][xi] === 'F') {
        line1.push('.', '.', '.');
        line2.push('.', 'F', '-');
        line3.push('.', '|', '.');
      }
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
  let visited = new Set([`${x},${y}`]);
  let queue = [{ x, y }];
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
