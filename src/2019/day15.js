import { execute } from './day09.js';

function step(current) {
  switch (current.direction) {
    case 1:
      return { ...current, x: current.x, y: current.y + 1 };
    case 2:
      return { ...current, x: current.x, y: current.y - 1 };
    case 3:
      return { ...current, x: current.x - 1, y: current.y };
    case 4:
      return { ...current, x: current.x + 1, y: current.y };
  }
}

function getNeighbors(next) {
  return [
    { x: next.x, y: next.y + 1, distance: next.distance + 1 },
    { x: next.x, y: next.y - 1, distance: next.distance + 1 },
    { x: next.x + 1, y: next.y, distance: next.distance + 1 },
    { x: next.x - 1, y: next.y, distance: next.distance + 1 },
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
    const neighbors = getNeighbors(next);
    if (neighbors.some(p => map[`${p.x},${p.y}`] === undefined)) {
      complete = false;
    }
    const filtered = neighbors
      .filter(p => map[`${p.x},${p.y}`] > 0)
      .filter(p => !visited.has(`${p.x},${p.y}`));
    queue = queue.concat(filtered);
  }
  return { max, distance: Infinity, complete };
}

function createMap(input, map = {}) {
  let output = 1;
  let current = { x: 0, y: -1, direction: 1 };

  function move() {
    const next = step(current);
    map[`${next.x},${next.y}`] = output;
    if (output >= 1) {
      current = next;
    }
    current.direction = Math.floor(Math.random() * 4) + 1;
    return current.direction;
  }

  const user = { input: move, output: x => (output = x), base: 0 };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  while (output !== 2 && ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }

  const dest = step(current);
  map[`${dest.x},${dest.y}`] = 2;
  return dest;
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
    const dest = createMap(input, map);
    result = solve(map, dest, { x: Infinity, y: Infinity });
  } while (!result.complete);
  return result.max;
}
