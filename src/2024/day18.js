export function part1(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n").map(line => line.split(",").map(Number));
  let current = { x: 0, y: 0, steps: 0 };
  let visited = new Set([`${current.x},${current.y}`]);
  for (let i = 0; i < fallen; i++) visited.add(`${bytes[i][0]},${bytes[i][1]}`);

  let queue = [current];
  while (queue.length) {
    current = queue.shift();
    if (current.x === wh && current.y === wh) return current.steps;
    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 },
    ].filter(({ x, y }) => {
      const key = `${x},${y}`;
      return x >= 0 && x <= wh && y >= 0 && y <= wh && !visited.has(key);
    });
    neighbors.forEach(neighbor => {
      visited.add(`${neighbor.x},${neighbor.y}`);
      queue.push({ ...neighbor, steps: current.steps + 1 });
    });
  }
}

export function part2(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n").map(line => line.split(",").map(Number));
  for (let i = fallen; i < bytes.length; i++) {
    if (!part1(input, wh, i)) return bytes[i - 1].join(",");
  }
}
