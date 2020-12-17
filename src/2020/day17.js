function calc(coordinates) {
  if (coordinates.length === 0) {
    return [[]];
  } else {
    const rest = calc(coordinates.slice(1));
    return [
      ...rest.map(x => [coordinates[0] - 1, ...x]),
      ...rest.map(x => [coordinates[0], ...x]),
      ...rest.map(x => [coordinates[0] + 1, ...x]),
    ];
  }
}

function getNeighbors(key) {
  const coordinates = key.split(',').map(x => +x);
  return calc(coordinates)
    .map(c => c.join(','))
    .filter(c => c !== key);
}

export function part1(input, dimensions = 3) {
  let map = new Map();
  input.split('\n').map((line, y) => {
    line.split('').map((char, x) => {
      const coordinates = new Array(dimensions).fill(0);
      coordinates[0] = x;
      coordinates[1] = y;
      map.set(coordinates.join(','), char === '#');
    });
  });
  let count;
  for (let i = 0; i < 6; i++) {
    let next = new Map();
    let missing = [];
    count = 0;

    for (let key of map.keys()) {
      if (map.get(key)) {
        missing = missing.concat(
          getNeighbors(key).filter(key => !map.has(key)),
        );
      }
    }
    missing.forEach(key => map.set(key, false));

    for (let key of map.keys()) {
      const active = getNeighbors(key).filter(key => map.get(key)).length;
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
