function getNeighbors(maps, { x, y, steps }) {
  let map = maps[(steps + 1) % maps.length];
  return [
    { x: x - 1, y, steps: steps + 1 },
    { x: x + 1, y, steps: steps + 1 },
    { x, y: y - 1, steps: steps + 1 },
    { x, y: y + 1, steps: steps + 1 },
    { x, y, steps: steps + 1 },
  ].filter(pos => !map.has(`${pos.x},${pos.y}`));
}

function makeTrip(maps, start, end, steps = 0) {
  let queue = [{ ...start, steps }];
  let visited = new Set();
  while (queue.length > 0) {
    let next = queue.shift();
    if (next.x === end.x && next.y === end.y) return next.steps;
    for (let pos of getNeighbors(maps, next)) {
      let hash = `${pos.x},${pos.y},${pos.steps % maps.length}`;
      if (!visited.has(hash)) {
        visited.add(hash);
        queue.push(pos);
      }
    }
  }
}

function nextMap(map, width, height) {
  let next = new Map();
  for (let key of map.keys()) {
    let [x, y] = key.split(",").map(n => +n);
    for (let thing of map.get(key)) {
      let pos = key;
      if (thing === ">") pos = `${x === width - 2 ? 1 : x + 1},${y}`;
      if (thing === "<") pos = `${x === 1 ? width - 2 : x - 1},${y}`;
      if (thing === "v") pos = `${x},${y === height - 2 ? 1 : y + 1}`;
      if (thing === "^") pos = `${x},${y === 1 ? height - 2 : y - 1}`;
      next.set(pos, (next.get(pos) || []).concat([thing]));
    }
  }
  return next;
}

function parse(input) {
  let map = new Map();
  let width = input.split("\n")[0].length;
  let height = input.split("\n").length;
  let start = { x: 1, y: 0 };
  let end = { x: width - 2, y: height - 1 };
  input.split("\n").forEach((line, y) => {
    line.split("").forEach((cell, x) => {
      if (cell !== ".") {
        map.set(`${x},${y}`, (map.get(`${x},${y}`) || []).concat([cell]));
      }
    });
  });
  map.set(`${start.x},${start.y - 1}`, ["#"]);
  map.set(`${end.x},${end.y + 1}`, ["#"]);

  let serialize = map => {
    let serializeKey = key => `${key}:${map.get(key).join("")}`;
    return Array.from(map.keys()).sort().map(serializeKey).join(",");
  };
  let serialized = serialize(map);
  let maps = [];
  do {
    maps.push(map);
    map = nextMap(map, width, height);
  } while (serialize(map) !== serialized);
  return { maps, start, end };
}

export function part1(input) {
  let { maps, start, end } = parse(input);
  return makeTrip(maps, start, end);
}

export function part2(input) {
  let { maps, start, end } = parse(input);
  let steps = 0;
  steps = makeTrip(maps, start, end, steps);
  steps = makeTrip(maps, end, start, steps);
  steps = makeTrip(maps, start, end, steps);
  return steps;
}
