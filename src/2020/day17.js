import { lines } from '../utils/commons.js';

const cache = [];
function offsets(dimensions) {
  if (dimensions === 0) {
    return [[]];
  } else if (!cache[dimensions]) {
    const rest = offsets(dimensions - 1);
    cache[dimensions] = rest.flatMap(x => [-1, 0, 1].map(n => [n, ...x]));
  }
  return cache[dimensions];
}

function neighbors(key) {
  const coordinates = key.split(',').map(x => +x);
  return offsets(coordinates.length)
    .map(x => x.map((c, i) => coordinates[i] + c).join(','))
    .filter(x => x !== key);
}

export function part1(input, dimensions = 3) {
  let map = new Map();
  lines(input).map((line, y) => {
    line.split('').map((char, x) => {
      const coordinates = new Array(dimensions - 2).fill(0);
      map.set([x, y, ...coordinates].join(','), char === '#');
    });
  });

  let count;
  for (let i = 0; i < 6; i++) {
    let next = new Map();
    let missing = [];
    count = 0;

    for (let key of map.keys()) {
      if (map.get(key)) {
        missing = missing.concat(neighbors(key).filter(key => !map.has(key)));
      }
    }
    missing.forEach(key => map.set(key, false));

    for (let key of map.keys()) {
      const active = neighbors(key).filter(key => map.get(key)).length;
      next.set(key, (map.get(key) && active === 2) || active === 3);
      if (next.get(key)) {
        count++;
      }
    }
    map = next;
  }
  return count;
}

export function part2(input) {
  return part1(input, 4);
}
