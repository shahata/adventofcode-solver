let cache = {};
const pos = ({ x, y }) => `${x},${y}`;
const risk = (point, depth) => erosion(point, depth) % 3;

function erosion({ x, y }, depth) {
  let geo;
  if (cache[pos({ x, y })] !== undefined) {
    return cache[pos({ x, y })];
  } else if (y === 0) {
    geo = x * 16807;
  } else if (x === 0) {
    geo = y * 48271;
  } else {
    geo = erosion({ x: x - 1, y }, depth) * erosion({ x, y: y - 1 }, depth);
  }
  cache[pos({ x, y })] = (geo + depth) % 20183;
  return cache[pos({ x, y })];
}

function parse(input) {
  const [depth, x, y] = input.match(/\d+/g).map(x => parseInt(x));
  return { depth, target: { x, y } };
}

function part1(input) {
  const { depth, target } = parse(input);
  let sum = 0;
  cache = { [pos(target)]: 0 };
  for (let x = 0; x <= target.x; x++) {
    for (let y = 0; y <= target.y; y++) {
      sum += risk({ x, y }, depth);
    }
  }
  return sum;
}

function neighbors({ position, equip, time }, depth, target) {
  const options = [];
  const now = risk(position, depth);
  const add = (p, e) =>
    options.push({ position: p, equip: e, time: time + (e === equip ? 1 : 8) });
  const positions = [
    { x: position.x - 1, y: position.y + 0 },
    { x: position.x + 1, y: position.y + 0 },
    { x: position.x + 0, y: position.y - 1 },
    { x: position.x + 0, y: position.y + 1 },
  ].filter(p => p.x >= 0 && p.y >= 0);
  positions.forEach(p => {
    const type = risk(p, depth);
    if (p.x === target.x && p.y === target.y) {
      if (now !== 1 || equip === 'gear') add(p, 'torch');
      else {
        //neither -> gear -> walk -> torch
        options.push({ position: p, equip: 'torch', time: time + 15 });
      }
    } else if (type === 0) {
      if (now !== 1) add(p, 'torch');
      if (now !== 2) add(p, 'gear');
    } else if (type === 1) {
      if (now !== 0) add(p, 'neither');
      if (now !== 2) add(p, 'gear');
    } else if (type === 2) {
      if (now !== 1) add(p, 'torch');
      if (now !== 0) add(p, 'neither');
    }
  });
  return options;
}

function part2(input) {
  const { depth, target } = parse(input);
  const visited = new Map();
  const queue = [{ position: { x: 0, y: 0 }, equip: 'torch', time: 0 }];
  const score = a =>
    a.time +
    Math.abs(a.position.x - target.x) +
    Math.abs(a.position.y - target.y);
  cache = { [pos(target)]: 0 };
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.position.x === target.x && current.position.y === target.y) {
      return current.time;
    }
    const options = neighbors(current, depth, target);
    options.forEach(o => {
      const v = visited.get(`${o.position.x},${o.position.y},${o.equip}`);
      if (!v || o.time < v) {
        visited.set(`${o.position.x},${o.position.y},${o.equip}`, o.time);
        queue.push(o);
      }
    });
    queue.sort((a, b) => score(a) - score(b));
  }
}

module.exports = { part1, part2 };
