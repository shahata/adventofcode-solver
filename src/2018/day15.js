function attackIfPossible(map, units, unit) {
  const attack = units
    .filter(
      u =>
        u.type !== unit.type &&
        ((u.x === unit.x && Math.abs(u.y - unit.y) === 1) ||
          (u.y === unit.y && Math.abs(u.x - unit.x) === 1)),
    )
    .sort((a, b) => a.hit - b.hit || a.y - b.y || a.x - b.x)
    .shift();
  if (attack) {
    attack.hit -= unit.attack;
    if (attack.hit <= 0) {
      units.splice(units.indexOf(attack), 1);
    }
  }
  return !!attack;
}

function neighbors(map, units, next, type) {
  return [
    { x: next.x, y: next.y - 1 },
    { x: next.x - 1, y: next.y },
    { x: next.x + 1, y: next.y },
    { x: next.x, y: next.y + 1 },
  ]
    .filter(
      p =>
        map[p.y] &&
        map[p.y][p.x] === '.' &&
        !units.find(u => u.x === p.x && u.y === p.y && u.type === type),
    )
    .map(p => ({ ...p, path: next.path.concat({ ...p }) }));
}

function find(map, units, unit) {
  const queue = [{ x: unit.x, y: unit.y, path: [] }];
  const visited = new Set();
  while (queue.length) {
    const next = queue.shift();
    if (
      next.path.length > 0 &&
      units.find(u => u.x === next.x && u.y === next.y)
    ) {
      return next.path.shift();
    }
    const options = neighbors(map, units, next, unit.type).filter(
      n => !visited.has(`${n.x},${n.y}`),
    );
    options.forEach(n => visited.add(`${n.x},${n.y}`));
    queue.push(...options);
  }
}

function moveIfPossible(map, units, unit) {
  const move = find(map, units, unit);
  if (move) {
    unit.x = move.x;
    unit.y = move.y;
  }
  return !!move;
}

function turn(map, units) {
  units.sort((a, b) => a.y - b.y || a.x - b.x);
  for (let i = 0; i < units.length; i++) {
    if (
      units.filter(u => u.type === 'E').length === 0 ||
      units.filter(u => u.type === 'G').length === 0
    ) {
      return false;
    }
    const unit = units[i];
    if (!attackIfPossible(map, units, unit)) {
      if (moveIfPossible(map, units, unit)) {
        attackIfPossible(map, units, unit);
      }
    }
    i = units.indexOf(unit);
  }
  return true;
}

function parse(input) {
  const units = [];
  const map = input
    .replace(/[EG]/g, '.')
    .split('\n')
    .map(x => x.split(''));
  input.split('\n').forEach((row, y) =>
    row.split('').forEach((cell, x) => {
      if ('EG'.includes(cell)) {
        units.push({ type: cell, attack: 3, hit: 200, x, y });
      }
    }),
  );
  return { map, units };
}

function print(map, units) {
  const result = map.map(row => row.map(x => x));
  units.forEach(u => (result[u.y][u.x] = u.type));
  console.log(result.map(x => x.join('')).join('\n'));
  console.log(units);
}

function part1(input) {
  let i = 0;
  const { map, units } = parse(input);
  while (turn(map, units)) {
    print(map, units);
    i++;
  }
  console.log(i);
  return i * units.reduce((sum, u) => (sum += u.hit), 0);
}

function part2(input) {
  return 0;
}

module.exports = { part1, part2 };
