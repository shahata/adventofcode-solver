const opposite = { up: "down", down: "up", left: "right", right: "left" };

function parse(input) {
  let map = input.split("\n").map(line => line.split(""));
  let sy = map.findIndex(line => line.includes("S"));
  let sx = map[sy].indexOf("S");
  let ey = map.findIndex(line => line.includes("E"));
  let ex = map[ey].indexOf("E");
  return { map, start: { x: sx, y: sy }, end: { x: ex, y: ey } };
}

function getNeighbors(current, map) {
  let neighbors = [
    { x: current.x - 1, y: current.y, direction: "left" },
    { x: current.x + 1, y: current.y, direction: "right" },
    { x: current.x, y: current.y - 1, direction: "up" },
    { x: current.x, y: current.y + 1, direction: "down" },
  ]
    .filter(n => n.direction !== opposite[current.direction])
    .filter(n => map[n.y]?.[n.x] !== "#")
    .map(n => ({
      ...n,
      path: current.path.concat(`${n.x},${n.y}`),
      score: current.score + (n.direction !== current.direction ? 1001 : 1),
    }));
  return neighbors;
}

function solve(input, part2 = false) {
  let { map, start, end } = parse(input);
  let current = { ...start, score: 0, direction: "right", path: ["0,0"] };
  let queue = [current];
  let visited = new Map();
  let results = [{ score: Infinity }];
  visited.set(`${current.x},${current.y}`, 0);
  while (queue.length > 0) {
    current = queue.shift();
    if (current.x === end.x && current.y === end.y) {
      if (current.score < results[0].score) results = [current];
      if (current.score === results[0].score) results.push(current);
      continue;
    }
    getNeighbors(current, map).forEach(n => {
      const prev = visited.get(`${n.x},${n.y},${n.direction}`) || Infinity;
      // for part two we follow also paths with same score passing the same cell
      // this can easily be optimized by saving the path and going in only once
      // alternatively we could use dfs with memoization to optimize the search
      if (prev > n.score || (part2 && prev === n.score)) {
        queue.push(n);
        visited.set(`${n.x},${n.y},${n.direction}`, n.score);
      }
    });
  }
  return results;
}

export function part1(input) {
  return solve(input)[0].score;
}

export function part2(input) {
  const results = solve(input, true).map(result => new Set(result.path));
  return results.reduce((acc, next) => acc.union(next)).size;
}
