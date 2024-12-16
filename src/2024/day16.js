const opposite = { up: "down", down: "up", left: "right", right: "left" };

function solve(input, part2 = false) {
  let map = input.split("\n").map(line => line.split(""));
  let sy = map.findIndex(line => line.includes("S"));
  let sx = map[sy].indexOf("S");
  let ey = map.findIndex(line => line.includes("E"));
  let ex = map[ey].indexOf("E");
  let current = { x: sx, y: sy, score: 0, dir: "right", path: ["0,0"] };
  let queue = [current];
  let visited = new Map();
  let min = Infinity;
  let paths = [];
  visited.set(`${current.x},${current.y}`, 0);
  while (queue.length > 0) {
    current = queue.shift();
    if (current.x === ex && current.y === ey) {
      if (current.score < min) paths = [current.path];
      if (current.score === min) paths.push(current.path);
      min = Math.min(min, current.score);
      continue;
    }
    let neighbors = [
      { x: current.x - 1, y: current.y, dir: "left" },
      { x: current.x + 1, y: current.y, dir: "right" },
      { x: current.x, y: current.y - 1, dir: "up" },
      { x: current.x, y: current.y + 1, dir: "down" },
    ]
      .filter(neighbor => neighbor.dir !== opposite[current.dir])
      .filter(neighbor => map[neighbor.y]?.[neighbor.x] !== "#")
      .map(neighbor => ({
        ...neighbor,
        path: current.path.concat(`${neighbor.x},${neighbor.y}`),
        score: current.score + (neighbor.dir !== current.dir ? 1001 : 1),
      }));
    neighbors.forEach(neighbor => {
      if (
        !visited.has(`${neighbor.x},${neighbor.y},${neighbor.dir}`) ||
        visited.get(`${neighbor.x},${neighbor.y},${neighbor.dir}`) >
          neighbor.score
      ) {
        queue.push(neighbor);
        visited.set(
          `${neighbor.x},${neighbor.y},${neighbor.dir}`,
          neighbor.score + (part2 ? 1 : 0),
        );
      }
    });
  }
  return { min, paths };
}

export function part1(input) {
  return solve(input).min;
}

export function part2(input) {
  return solve(input, true).paths.reduce(
    (acc, path) => acc.union(new Set(path)),
    new Set(),
  ).size;
}
