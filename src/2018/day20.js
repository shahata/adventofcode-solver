const walk = {
  W: ({ x, y }) => ({ x: x - 1, y: y + 0 }),
  E: ({ x, y }) => ({ x: x + 1, y: y + 0 }),
  N: ({ x, y }) => ({ x: x + 0, y: y - 1 }),
  S: ({ x, y }) => ({ x: x + 0, y: y + 1 }),
};
const pos = ({ x, y }) => `${x},${y}`;
const unique = arr =>
  arr
    .reduce((all, p) => all.concat(p), [])
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .filter((p, i, a) => !a[i - 1] || pos(p) !== pos(a[i - 1]));

function traverse(current, path, map) {
  let next;
  while (path.length > 0 && next !== "(") {
    next = path.shift();
    if (walk[next]) {
      current = walk[next](current);
      map.set(pos(current), "|");
      current = walk[next](current);
      map.set(pos(current), ".");
    }
  }
  if (path.length > 0) {
    let depth = 1;
    let option = [];
    let options = [];
    while (next !== ")" || depth > 0) {
      next = path.shift();
      if (next === "(") {
        depth++;
      } else if (next === ")") {
        depth--;
      }
      if ((depth === 1 && next === "|") || (depth === 0 && next === ")")) {
        options.push(option);
        option = [];
      } else {
        option.push(next);
      }
    }
    let ends = unique(options.map(option => traverse(current, option, map)));
    return unique(ends.map(end => traverse(end, path.slice(0), map)));
  } else {
    return [current];
  }
}

function calc(input) {
  let start = { x: 0, y: 0 };
  let map = new Map();
  map.set(pos(start), ".");
  traverse(start, input.slice(1, -1).split(""), map);

  let queue = [{ distance: 0, point: start }];
  let visited = new Set([pos(start)]);
  while (queue.length > 0) {
    let { distance, point } = queue.shift();
    map.set(pos(point), distance);
    let options = Object.keys(walk)
      .map(x => map.get(pos(walk[x](point))) === "|" && walk[x](walk[x](point)))
      .filter(x => x && !visited.has(pos(x)));
    options.forEach(option => {
      visited.add(pos(option));
      queue.push({ distance: distance + 1, point: option });
    });
  }
  return Array.from(map.values()).filter(x => typeof x === "number");
}

export function part1(input) {
  return Math.max(...calc(input).values());
}

export function part2(input) {
  return calc(input).filter(x => x >= 1000).length;
}
