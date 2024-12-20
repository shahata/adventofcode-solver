function findPath(input) {
  let map = input.split("\n").map(line => line.split(""));
  let sy = map.findIndex(line => line.includes("S"));
  let sx = map[sy].indexOf("S");
  let ey = map.findIndex(line => line.includes("E"));
  let ex = map[ey].indexOf("E");
  let queue = [{ x: sx, y: sy }];
  let visited = new Set([`${sx},${sy}`]);
  let path = [];
  map[ey][ex] = ".";
  while (queue.length) {
    let { x, y } = queue.shift();
    path.push({ x, y });
    if (x === ex && y === ey) break;
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(({ x, y }) => map[y]?.[x] === "." && !visited.has(`${x},${y}`));
    neighbors.forEach(({ x, y }) => {
      visited.add(`${x},${y}`);
      queue.push({ x, y });
    });
  }
  return path;
}

function countCheats(input, save, cheat) {
  const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  let path = findPath(input);
  let count = 0;
  for (let i = 0; i < path.length - save; i++) {
    for (let j = i + save; j < path.length; j++) {
      const length = distance(path[i], path[j]);
      if (j - i - length >= save && length <= cheat) count++;
    }
  }
  return count;
}

function countCheatsOriginal(input, save, cheat) {
  let map = input.split("\n").map(line => line.split(""));
  let sy = map.findIndex(line => line.includes("S"));
  let sx = map[sy].indexOf("S");
  let ey = map.findIndex(line => line.includes("E"));
  let ex = map[ey].indexOf("E");
  let queue = [{ x: sx, y: sy, steps: 0 }];
  let visited = new Set([`${sx},${sy}`]);
  let distance = new Map();
  map[ey][ex] = ".";
  while (queue.length) {
    let { x, y, steps } = queue.shift();
    distance.set(`${x},${y}`, steps);
    if (x === ex && y === ey) break;
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(({ x, y }) => map[y]?.[x] === "." && !visited.has(`${x},${y}`));
    neighbors.forEach(({ x, y }) => {
      visited.add(`${x},${y}`);
      queue.push({ x, y, steps: steps + 1 });
    });
  }
  let count = 0;
  queue = [{ x: sx, y: sy, steps: 0, jumped: 0, v: null }];
  while (queue.length) {
    let { x, y, steps, jumped, v } = queue.shift();
    if (distance.get(`${x},${y}`) !== null) {
      if (jumped === 0 && distance.get(`${x},${y}`) - steps < 0) continue;
      if (distance.get(`${x},${y}`) - steps >= save) count++;
    }
    if (jumped === cheat) continue;
    v = v || new Set([`${x},${y}`]);
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(({ x, y }) => map[y]?.[x] !== undefined);
    neighbors.forEach(({ x, y }) => {
      if (jumped === 0 && map[y][x] !== "#") {
        queue.push({ x, y, steps: steps + 1, jumped: 0, v: null });
      }
      if (!v.has(`${x},${y}`)) {
        v.add(`${x},${y}`);
        queue.push({ x, y, steps: steps + 1, jumped: jumped + 1, v });
      }
    });
  }
  return count;
}

export function part1(input, save = 100) {
  countCheats(input, save, 2);
  return countCheatsOriginal(input, save, 2);
}

export function part2(input, save = 100) {
  countCheats(input, save, 20);
  return countCheatsOriginal(input, save, 20);
}
