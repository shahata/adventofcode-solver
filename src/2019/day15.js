import { execute } from "./day09.js";

function getNeighbors(current) {
  return [
    { ...current, x: current.x, y: current.y + 1 }, //north=1
    { ...current, x: current.x, y: current.y - 1 }, //south=2
    { ...current, x: current.x - 1, y: current.y }, //west=3
    { ...current, x: current.x + 1, y: current.y }, //east=4
  ];
}

function solve(map, src, dest) {
  let max = 0;
  let complete = true;
  let queue = [{ x: src.x, y: src.y, distance: 0 }];
  let visited = new Set();
  while (queue.length) {
    let next = queue.shift();
    visited.add(`${next.x},${next.y}`);
    max = next.distance;
    if (next.x === dest.x && next.y === dest.y) {
      return { max, distance: next.distance, complete };
    }
    let neighbors = getNeighbors({ ...next, distance: next.distance + 1 });
    complete = complete && neighbors.every(p => map[`${p.x},${p.y}`] >= 0);
    let filtered = neighbors
      .filter(p => map[`${p.x},${p.y}`] > 0)
      .filter(p => !visited.has(`${p.x},${p.y}`));
    queue = queue.concat(filtered);
  }
  return { max, distance: Infinity, complete };
}

function createMap(input, map) {
  let oxygen, done;
  let output = 1;
  let current = { x: 0, y: -1, direction: 1 };
  let step = current => getNeighbors(current)[current.direction - 1];

  function move() {
    let next = step(current);
    map[`${next.x},${next.y}`] = output;
    current = output === 0 ? current : next;
    done = oxygen ? true : false; //make one more move after oxygen discovered
    oxygen = output === 2 ? current : oxygen;
    current.direction = Math.floor(Math.random() * 4) + 1;
    return current.direction;
  }

  let user = { input: move, output: x => (output = x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (!done) {
    ip = execute(ops, ip, user);
  }
  return oxygen;
}

export function part1(input) {
  let map = {};
  let dest = createMap(input, map);
  return solve(map, { x: 0, y: 0 }, dest).distance;
}

export function part2(input) {
  let map = {};
  let result;
  do {
    let src = createMap(input, map);
    result = solve(map, src, { x: Infinity, y: Infinity });
  } while (!result.complete);
  return result.max;
}
