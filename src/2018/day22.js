let cache = {};
const pos = ({ x, y }) => `${x},${y}`;
const terrain = (point, depth) => erosion(point, depth) % 3;

function erosion({ x, y }, depth) {
  let geo;
  if (cache[pos({ x, y })] !== undefined) return cache[pos({ x, y })];
  else if (y === 0) geo = x * 16807;
  else if (x === 0) geo = y * 48271;
  else geo = erosion({ x: x - 1, y }, depth) * erosion({ x, y: y - 1 }, depth);
  cache[pos({ x, y })] = (geo + depth) % 20183;
  return cache[pos({ x, y })];
}

function parse(input) {
  const [depth, x, y] = input.match(/\d+/g).map(Number);
  return { depth, target: { x, y } };
}

export function part1(input) {
  const { depth, target } = parse(input);
  let risk = 0;
  cache = { [pos(target)]: 0 };
  for (let x = 0; x <= target.x; x++) {
    for (let y = 0; y <= target.y; y++) {
      risk += terrain({ x, y }, depth);
    }
  }
  return risk;
}

function neighbors({ point, equip, time }, depth, target) {
  const options = [];
  const current = terrain(point, depth);
  const add = (p, e) =>
    options.push({ point: p, equip: e, time: time + (e === equip ? 1 : 8) });
  const points = [
    { x: point.x - 1, y: point.y + 0 },
    { x: point.x + 1, y: point.y + 0 },
    { x: point.x + 0, y: point.y - 1 },
    { x: point.x + 0, y: point.y + 1 },
  ].filter(p => p.x >= 0 && p.y >= 0);
  points.forEach(point => {
    const next = terrain(point, depth);
    if (point.x === target.x && point.y === target.y) {
      if (current !== 1 || equip === "gear") add(point, "torch");
      //neither -> gear -> walk -> torch (7 + 1 + 7 = 15)
      else options.push({ point, equip: "torch", time: time + 15 });
    } else if (next === 0) {
      if (current !== 1) add(point, "torch");
      if (current !== 2) add(point, "gear");
    } else if (next === 1) {
      if (current !== 0) add(point, "neither");
      if (current !== 2) add(point, "gear");
    } else if (next === 2) {
      if (current !== 1) add(point, "torch");
      if (current !== 0) add(point, "neither");
    }
  });
  return options;
}

export function part2(input) {
  const { depth, target } = parse(input);
  const visited = new Map();
  const queue = [{ point: { x: 0, y: 0 }, equip: "torch", time: 0 }];
  const score = a =>
    a.time + Math.abs(a.point.x - target.x) + Math.abs(a.point.y - target.y);
  cache = { [pos(target)]: 0 };
  while (queue.length > 0) {
    const n = queue.shift();
    if (n.point.x === target.x && n.point.y === target.y) {
      return n.time;
    }
    neighbors(n, depth, target).forEach(o => {
      const v = visited.get(`${o.point.x},${o.point.y},${o.equip}`);
      if (!v || o.time < v.time) {
        if (v) queue.splice(queue.indexOf(v), 1);
        visited.set(`${o.point.x},${o.point.y},${o.equip}`, o);
        queue.push(o);
      }
    });
    queue.sort((a, b) => score(a) - score(b));
  }
}
