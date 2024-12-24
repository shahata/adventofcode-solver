function getNeighbors(map, { x, y }) {
  return [
    map[y][x - 1],
    map[y][x + 1],
    map[y - 1] && map[y - 1][x],
    map[y + 1] && map[y + 1][x],
  ].filter(x => x);
}

function calcMemoKey(points, keys) {
  return [
    points.map(p => `(${p.x},${p.y})`).join(","),
    keys.sort().join(""),
  ].join(":");
}

function blockDeadEnds(map, current, visited = []) {
  visited.push(current);
  let neighbors = getNeighbors(map, current).filter(p => p && p.c !== "#");
  let filtered = neighbors.filter(p => !visited.includes(p));
  let blocked = filtered.filter(p => blockDeadEnds(map, p, visited));
  if (
    filtered.length + 1 === neighbors.length &&
    blocked.length === filtered.length &&
    current.c === "."
  ) {
    current.c = "#";
    return true;
  }
}

function findNextKeys(map, point, keys) {
  let nextKeys = [];
  let queue = [{ point, distance: 0 }];
  let visited = new Set();
  while (queue.length) {
    let next = queue.shift();
    visited.add(next.point);
    getNeighbors(map, next.point)
      .filter(p => p && p.c !== "#" && !visited.has(p))
      .filter(p => !p.c.match(/[A-Z]/) || keys.includes(p.c.toLowerCase()))
      .forEach(p => {
        if (p.c.match(/[a-z]/) && !keys.includes(p.c)) {
          nextKeys.push({ key: p.c, point: p, distance: next.distance + 1 });
        } else {
          queue.push({ point: p, distance: next.distance + 1 });
        }
      });
  }
  return nextKeys;
}

function minimumDistance(map, points, keys = [], memo = {}) {
  let memoKey = calcMemoKey(points, keys);
  if (!memo[memoKey]) {
    let nextKeysPerPoint = points.map(point => findNextKeys(map, point, keys));
    if (nextKeysPerPoint.reduce((sum, x) => sum + x.length, 0) === 0) {
      memo[memoKey] = 0;
    } else {
      let distances = nextKeysPerPoint.map((nextKeys, i) => {
        let distances = nextKeys.map(x => {
          let nextPoints = points.map((p, j) => (i === j ? x.point : p));
          return (
            x.distance +
            minimumDistance(map, nextPoints, keys.concat([x.key]), memo)
          );
        });
        return Math.min(...distances);
      });
      memo[memoKey] = Math.min(...distances);
    }
  }
  return memo[memoKey];
}

function mutate(map) {
  let line = map.find(line => line.find(p => p.c === "@"));
  let current = line.find(p => p.c === "@");
  let currents = [
    map[current.y + 1][current.x + 1],
    map[current.y + 1][current.x - 1],
    map[current.y - 1][current.x + 1],
    map[current.y - 1][current.x - 1],
  ];
  getNeighbors(map, current).forEach(p => (p.c = "#"));
  currents.forEach(p => (p.c = "."));
  map[current.y][current.x].c = "#";
  return currents;
}

export function part1(input) {
  let map = input
    .split("\n")
    .map((line, y) => line.split("").map((c, x) => ({ c, x, y })));
  let line = map.find(line => line.find(p => p.c === "@"));
  let current = line.find(p => p.c === "@");
  blockDeadEnds(map, current);
  return minimumDistance(map, [current]);
}

export function part2(input) {
  let map = input
    .split("\n")
    .map((line, y) => line.split("").map((c, x) => ({ c, x, y })));
  let currents = mutate(map);
  currents.forEach(point => blockDeadEnds(map, point));
  return minimumDistance(map, currents);
}
