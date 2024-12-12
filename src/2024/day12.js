function walk(map, x, y) {
  const queue = [{ x, y }];
  const cells = new Set([`${x},${y}`]);
  const walls = new Map();
  while (queue.length > 0) {
    const p = queue.shift();
    const neighbors = [
      { x: p.x - 1, y: p.y },
      { x: p.x + 1, y: p.y },
      { x: p.x, y: p.y - 1 },
      { x: p.x, y: p.y + 1 },
    ];
    neighbors.forEach(o => {
      if (map[o.y]?.[o.x] === map[y][x]) {
        if (!cells.has(`${o.x},${o.y}`)) {
          cells.add(`${o.x},${o.y}`);
          queue.push(o);
        }
      } else {
        if (o.x === p.x) {
          const wall = `h,${p.y},${o.y}`;
          walls.set(wall, (walls.get(wall) || new Set()).add(p.x));
        } else {
          const wall = `v,${p.x},${o.x}`;
          walls.set(wall, (walls.get(wall) || new Set()).add(p.y));
        }
      }
    });
  }
  return { cells, walls };
}

function forEachRegion(input, fn) {
  const map = input.split("\n").map(line => line.split(""));
  let visited = new Set();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(`${x},${y}`)) continue;
      const { cells, walls } = walk(map, x, y);
      visited = visited.union(cells);
      fn(cells, walls);
    }
  }
}

function countSides(walls) {
  let sides = 0;
  walls.forEach(cells => {
    const points = [...cells].sort((a, b) => a - b);
    for (let i = 0; i < points.length; i++) {
      if (points[i] + 1 !== points[i + 1]) sides++;
    }
  });
  return sides;
}

export function part1(input) {
  let sum = 0;
  forEachRegion(input, (cells, walls) => {
    let perimeter = walls.values().reduce((acc, set) => acc + set.size, 0);
    sum += cells.size * perimeter;
  });
  return sum;
}

export function part2(input) {
  let sum = 0;
  forEachRegion(input, (cells, walls) => {
    sum += cells.size * countSides(walls);
  });
  return sum;
}
