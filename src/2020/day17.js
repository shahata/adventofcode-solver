import { gol } from "../utils/game-of-life.js";

let cache = [];
function offsets(dimensions) {
  if (dimensions === 0) {
    return [[]];
  } else if (!cache[dimensions]) {
    let rest = offsets(dimensions - 1);
    cache[dimensions] = rest.flatMap(x => [-1, 0, 1].map(n => [n, ...x]));
  }
  return cache[dimensions];
}

function neighbors(key) {
  let coordinates = key.split(",").map(Number);
  return offsets(coordinates.length)
    .map(x => x.map((c, i) => coordinates[i] + c).join(","))
    .filter(x => x !== key);
}

export function part1(input, dimensions = 3) {
  let map = new Map();
  input.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      let coordinates = new Array(dimensions - 2).fill(0);
      map.set([x, y, ...coordinates].join(","), char === "#");
    });
  });

  return gol(
    map,
    neighbors,
    (current, active) => (current && active === 2) || active === 3,
    6,
  ).count;
}

export function part2(input) {
  return part1(input, 4);
}
