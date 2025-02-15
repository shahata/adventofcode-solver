import { combinations } from "combinatorial-generators";

function parse(input) {
  return input
    .split("\n")
    .slice(2)
    .map(x => {
      let fix = x => +x.replace(/.$/, "");
      let [name, size, used, avail, use] = x.split(/\s+/);
      return { name, size: fix(size), used: fix(used), avail: fix(avail), use };
    });
}

function solve1(nodes) {
  let pairs = [...combinations(nodes, 2)];
  return pairs.concat(pairs.map(x => [x[1], x[0]])).filter(x => {
    return x[0].used !== 0 && x[0].used <= x[1].avail;
  });
}

function cellId({ x, y }) {
  return `${x}-${y}`;
}

function build(nodes) {
  let big = Math.floor(
    Math.log10(nodes.sort((a, b) => a.used - b.used).at(-1).used),
  );
  let map = {};
  let start,
    data = { x: 0, y: 0 };
  nodes.forEach(node => {
    let [, x, y] = node.name.match(/x(\d+)-y(\d+)$/).map(Number);
    map[cellId({ x, y })] = { wall: Math.floor(Math.log10(node.used)) === big };
    start = node.used === 0 ? { x, y } : start;
    data = y === 0 && x > data.x ? { x, y } : data;
  });
  return { map, start, data };
}

function getNeighbors(map, point) {
  return [
    { x: point.x - 1, y: point.y, distance: point.distance + 1 },
    { x: point.x + 1, y: point.y, distance: point.distance + 1 },
    { x: point.x, y: point.y - 1, distance: point.distance + 1 },
    { x: point.x, y: point.y + 1, distance: point.distance + 1 },
  ].filter(p => map[cellId(p)]);
}

function shortest(map, source, destination) {
  let queue = [source];
  let visited = { [cellId(source)]: { distance: 0 } };
  while (queue.length) {
    let next = queue.shift();
    if (next.x === destination.x && next.y === destination.y) {
      return visited[cellId(next)].distance;
    } else {
      let neighbors = getNeighbors(map, next).filter(x => !visited[cellId(x)]);
      let distance = visited[cellId(next)].distance + 1;
      neighbors.forEach(x => (visited[cellId(x)] = { distance }));
      queue = queue.concat(neighbors.filter(x => !map[cellId(x)].wall));
    }
  }
  return 0;
}

export function part1(input) {
  let nodes = parse(input);
  return solve1(nodes).length;
}

export function part2(input) {
  let nodes = parse(input);
  let { map, start, data } = build(nodes);
  return shortest(map, start, { x: data.x - 1, y: 0 }) + 1 + 5 * (data.x - 1);
}
