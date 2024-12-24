function calc(map, x) {
  if (map[x] === undefined) {
    return 0;
  } else if (map[x].length === undefined) {
    map[x].length = calc(map, map[x].orbiting) + 1;
  }
  return map[x].length;
}

export function part1(input) {
  let orbits = input.split("\n").map(x => x.split(")"));
  let map = {};
  orbits.forEach(orbit => {
    map[orbit[1]] = { orbiting: orbit[0] };
  });
  return Object.keys(map)
    .map(x => calc(map, x))
    .reduce((a, b) => a + b);
}

export function part2(input) {
  let orbits = input.split("\n").map(x => x.split(")"));
  let map = {};
  let start, destination;
  orbits.forEach(orbit => {
    if (orbit[1] === "YOU") {
      start = orbit[0];
    } else if (orbit[1] === "SAN") {
      destination = orbit[0];
    }
    map[orbit[1]] = (map[orbit[1]] || []).concat([orbit[0]]);
    map[orbit[0]] = (map[orbit[0]] || []).concat([orbit[1]]);
  });

  let queue = [{ distance: 0, position: start }];
  let visited = ["YOU"];
  while (queue.length !== 0) {
    let next = queue.shift();
    if (next.position === destination) {
      return next.distance;
    }
    let neighbors = map[next.position].filter(
      x => map[x] && !visited.includes(x),
    );
    queue = queue.concat(
      neighbors.map(x => ({ position: x, distance: next.distance + 1 })),
    );
    visited.push(next.position);
  }
}
