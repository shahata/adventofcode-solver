function getOptions(check, key) {
  const [x, y] = key.split(',').map(n => +n);
  switch (check) {
    case 'north':
      return [
        { x: x - 1, y: y - 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'south':
      return [
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'west':
      return [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'east':
      return [
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
  }
}

function round(elves, checks) {
  const proposals = new Map();
  for (const key of elves.keys()) {
    const all = checks.flatMap(check => getOptions(check, key));
    if (all.every(o => !elves.has(o))) continue;
    for (const check of checks) {
      const options = getOptions(check, key);
      const decision = options[1];
      if (options.every(option => !elves.has(option))) {
        proposals.set(decision, (proposals.get(decision) || []).concat(key));
        break;
      }
    }
  }
  let count = 0;
  for (const key of proposals.keys()) {
    const moving = proposals.get(key);
    if (moving.length === 1) {
      elves.delete(moving[0]);
      elves.set(key, true);
      count++;
    }
  }
  checks.push(checks.shift());
  return count;
}

export function part1(input) {
  let elves = new Map();
  input.split('\n').forEach((line, y) =>
    line.split('').forEach((cell, x) => {
      if (cell === '#') elves.set(`${x},${y}`, true);
    }),
  );
  const checks = ['north', 'south', 'west', 'east'];
  for (let i = 0; i < 10; i++) round(elves, checks);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const key of elves.keys()) {
    const [x, y] = key.split(',').map(n => +n);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return (maxX - minX + 1) * (maxY - minY + 1) - elves.size;
}

export function part2(input) {
  let elves = new Map();
  input.split('\n').forEach((line, y) =>
    line.split('').forEach((cell, x) => {
      if (cell === '#') elves.set(`${x},${y}`, true);
    }),
  );
  const checks = ['north', 'south', 'west', 'east'];
  let result = 1;
  while (round(elves, checks) > 0) result++;
  return result;
}
