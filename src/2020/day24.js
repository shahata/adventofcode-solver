import { gol } from "../utils/game-of-life.js";

let go = {
  w: ({ x, y }) => ({ x: x - 1, y }),
  e: ({ x, y }) => ({ x: x + 1, y }),
  nw: ({ x, y }) => ({ x: x - 0.5, y: y - 1 }),
  ne: ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  sw: ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  se: ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
};

function parse(input) {
  let instructions = input
    .split("\n")
    .map(line => line.match(/(w|e|nw|ne|sw|se)/g));
  let map = new Map();
  instructions.forEach(x => {
    let position = { x: 0, y: 0 };
    x.forEach(direction => (position = go[direction](position)));
    let key = `${position.x},${position.y}`;
    map.set(key, !map.get(key));
  });
  return map;
}

export function part1(input) {
  let map = parse(input);
  return [...map.values()].filter(x => x).length;
}

function neighbors(key) {
  let [x, y] = key.split(",").map(Number);
  return Object.values(go)
    .map(f => f({ x, y }))
    .map(p => `${p.x},${p.y}`);
}

export function part2(input) {
  let map = parse(input);
  return gol(
    map,
    neighbors,
    (current, active) => (current && active === 1) || active === 2,
    100,
  ).count;
}
