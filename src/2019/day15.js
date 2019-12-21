import { execute } from './day09.js';

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
  const visited = new Set();
  while (queue.length) {
    const next = queue.shift();
    visited.add(`${next.x},${next.y}`);
    max = next.distance;
    if (next.x === dest.x && next.y === dest.y) {
      return { max, distance: next.distance, complete };
    }
    const neighbors = getNeighbors({ ...next, distance: next.distance + 1 });
    complete = complete && neighbors.every(p => map[`${p.x},${p.y}`] >= 0);
    const filtered = neighbors
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
  const step = current => getNeighbors(current)[current.direction - 1];

  function move() {
    const next = step(current);
    map[`${next.x},${next.y}`] = output;
    current = output === 0 ? current : next;
    done = oxygen ? true : false; //make one more move after oxygen discovered
    oxygen = output === 2 ? current : oxygen;
    current.direction = Math.floor(Math.random() * 4) + 1;
    return current.direction;
  }

  const user = { input: move, output: x => (output = x), base: 0 };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  while (!done) {
    ip = execute(ops, ip, user);
  }
  return oxygen;
}

export function part1(input) {
  const map = {};
  const dest = createMap(input, map);
  return solve(map, { x: 0, y: 0 }, dest).distance;
}

export function part2(input) {
  const map = {};
  let result;
  do {
    const src = createMap(input, map);
    result = solve(map, src, { x: Infinity, y: Infinity });
  } while (!result.complete);
  return result.max;
}
