function solve(input) {
  const map = input.split('\n').map(line => line.split(''));
  const y = map.findIndex(line => line.includes('S'));
  const x = map[y].findIndex(c => c === 'S');
  const queue = [{ x, y, steps: 0 }];
  let visited = new Set();
  let max = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    const UP = { x: current.x, y: current.y - 1, steps: current.steps + 1 };
    const DOWN = { x: current.x, y: current.y + 1, steps: current.steps + 1 };
    const LEFT = { x: current.x - 1, y: current.y, steps: current.steps + 1 };
    const RIGHT = { x: current.x + 1, y: current.y, steps: current.steps + 1 };
    let next = [];
    if (map[current.y][current.x] === 'S') {
      let S = '';
      if ('|7F'.includes(map[UP.y]?.[UP.x])) S += 'U';
      if ('|LJ'.includes(map[DOWN.y]?.[DOWN.x])) S += 'D';
      if ('-LF'.includes(map[LEFT.y]?.[LEFT.x])) S += 'L';
      if ('-J7'.includes(map[RIGHT.y]?.[RIGHT.x])) S += 'R';
      if (S === 'UD') map[current.y][current.x] = '|';
      if (S === 'LR') map[current.y][current.x] = '-';
      if (S === 'UR') map[current.y][current.x] = 'L';
      if (S === 'UL') map[current.y][current.x] = 'J';
      if (S === 'DL') map[current.y][current.x] = '7';
      if (S === 'DR') map[current.y][current.x] = 'F';
    }
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

export function part1(input) {
  const { max } = solve(input);
  return max;
}

function zoomin(map) {
  let bigger = [];
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
    bigger.push(line1, line2, line3);
  }
  return bigger;
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

export function part2(input) {
  const { map, visited } = solve(input);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!visited.has(`${x},${y}`)) map[y][x] = '.';
    }
  }
  const bigger = zoomin(map);
  for (let y = 0; y < bigger.length; y++) {
    for (let x = 0; x < bigger[y].length; x++) {
      if (bigger[y][x] === '.') flood(bigger, x, y);
    }
  }
  let sum = 0;
  for (let y = 1; y < bigger.length; y += 3) {
    for (let x = 1; x < bigger[y].length; x += 3) {
      if (bigger[y][x] === 'I') sum++;
    }
  }
  return sum;
}
