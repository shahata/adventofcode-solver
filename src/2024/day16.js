function parse(input) {
  let map = input.split("\n").map(line => line.split(""));
  let y = map.findIndex(line => line.includes("S"));
  let x = map[y].indexOf("S");
  let ey = map.findIndex(line => line.includes("E"));
  let ex = map[ey].indexOf("E");
  return { map, start: { x, y, direction: "right" }, end: { x: ex, y: ey } };
}

function getNeighbors(current, map) {
  const opposite = { up: "down", down: "up", left: "right", right: "left" };
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
      path: current.path.union(new Set([`${n.x},${n.y}`])),
      score: current.score + (n.direction !== current.direction ? 1001 : 1),
    }));
  return neighbors;
}

function solve(input) {
  let { map, start, end } = parse(input);
  let curr = { ...start, score: 0, path: new Set([`${start.x},${start.y}`]) };
  let queue = [curr];
  let visited = new Map();
  let results = [{ score: Infinity }];
  const key = p => `${p.x},${p.y},${p.direction}`;
  visited.set(key(curr), curr);
  while (queue.length > 0) {
    curr = queue.shift();
    if (curr.x === end.x && curr.y === end.y) {
      if (curr.score < results[0].score) results = [curr];
      if (curr.score === results[0].score) results.push(curr);
      continue;
    }
    getNeighbors(curr, map).forEach(n => {
      const prev = visited.get(key(n));
      if (!prev || prev.score > n.score) {
        queue.push(n);
        visited.set(key(n), n);
      } else if (prev.score === n.score) {
        prev.path = prev.path.union(n.path);
      }
    });
  }
  return results;
}

export function part1(input) {
  return solve(input)[0].score;
}

export function part2(input) {
  const results = solve(input).map(result => result.path);
  return results.reduce((acc, next) => acc.union(next)).size;
}
