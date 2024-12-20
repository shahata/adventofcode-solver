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

export function part1(input, save = 100, cheat = 2) {
  let path = findPath(input);
  let count = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = i + save; j < path.length; j++) {
      const distance =
        Math.abs(path[j].x - path[i].x) + Math.abs(path[j].y - path[i].y);
      const saved = j - i - distance;
      if (saved >= save && distance <= cheat) count++;
    }
  }
  return count;
}

export function part2(input, save = 100) {
  return part1(input, save, 20);
}
