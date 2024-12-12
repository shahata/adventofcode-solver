// AAAA
// BBCD
// BBCC
// EEEC

export function part1(input, part2 = false) {
  let regionId = 0;
  const map = input.split("\n").map(line => line.split(""));
  const cell2region = new Map();
  const region2cells = new Map();
  const region2walls = new Map();
  const cell2perimeter = new Map();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (cell2region.has(`${x},${y}`)) continue;
      const walls = new Map();
      regionId++;
      region2walls.set(regionId, walls);
      region2cells.set(regionId, new Set());
      let currentRegion = map[y][x];
      const queue = [{ x, y }];
      while (queue.length > 0) {
        const p = queue.shift();
        cell2region.set(`${p.x},${p.y}`, regionId);
        region2cells.get(regionId).add(`${p.x},${p.y}`);
        const neighbors = [
          { x: p.x - 1, y: p.y },
          { x: p.x + 1, y: p.y },
          { x: p.x, y: p.y - 1 },
          { x: p.x, y: p.y + 1 },
        ];
        neighbors.forEach(o => {
          if (map[o.y]?.[o.x] === currentRegion) {
            if (!cell2region.has(`${o.x},${o.y}`)) {
              cell2region.set(`${o.x},${o.y}`, regionId);
              queue.push(o);
            }
          } else {
            const perimeter = cell2perimeter.get(`${p.x},${p.y}`) || 0;
            cell2perimeter.set(`${p.x},${p.y}`, perimeter + 1);

            if (o.x === p.x) {
              let wall = `horizontal,${p.y},${o.y}`;
              if (!walls.has(wall)) walls.set(wall, new Set());
              walls.get(wall).add(p.x);
            } else {
              let wall = `vertical,${p.x},${o.x}`;
              if (!walls.has(wall)) walls.set(wall, new Set());
              walls.get(wall).add(p.y);
            }
          }
        });
      }
    }
  }
  let sum = 0;
  for (const regionId of region2cells.keys()) {
    const cells = region2cells.get(regionId);
    const area = cells.size;
    let perimeter = 0;
    cells.forEach(cell => (perimeter += cell2perimeter.get(cell) || 0));
    const walls = region2walls.get(regionId);
    let sides = 0;
    walls.forEach(cells => {
      const points = [...cells].sort((a, b) => a - b);
      for (let i = 0; i < points.length; i++) {
        if (points[i] + 1 !== points[i + 1]) sides++;
      }
    });
    if (!part2) sum += area * perimeter;
    else sum += area * sides;
  }
  return sum;
}

export function part2(input) {
  return part1(input, true);
}
