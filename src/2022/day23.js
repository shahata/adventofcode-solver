function getOptions(check, key) {
  const [x, y] = key.split(',').map(n => +n);
  switch (check) {
    case 'north':
      return [
        { x, y: y - 1 },
        { x: x - 1, y: y - 1 },
        { x: x + 1, y: y - 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'south':
      return [
        { x, y: y + 1 },
        { x: x - 1, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'west':
      return [
        { x: x - 1, y },
        { x: x - 1, y: y - 1 },
        { x: x - 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
    case 'east':
      return [
        { x: x + 1, y },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y: y + 1 },
      ].map(({ x, y }) => `${x},${y}`);
  }
}

function round(elves, checks) {
  const proposals = new Map();
  for (const key of elves.keys()) {
    const all = checks.flatMap(check => getOptions(check, key));
    if (all.every(option => !elves.has(option))) continue;
    for (const check of checks) {
      const options = getOptions(check, key);
      if (options.every(option => !elves.has(option))) {
        const decision = options[0];
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

  const keys = [...elves.keys()].map(key => key.split(',').map(n => +n));
  const xs = keys.map(key => key[0]).sort((a, b) => b - a);
  const ys = keys.map(key => key[1]).sort((a, b) => b - a);
  return (xs[0] - xs.pop() + 1) * (ys[0] - ys.pop() + 1) - elves.size;
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
