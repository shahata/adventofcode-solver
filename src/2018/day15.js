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
  const solutions = [];
  const queue = [{ x: unit.x, y: unit.y, path: [] }];
  const visited = new Set(`${unit.x},${unit.y}`);
  while (queue.length) {
    const next = queue.shift();
    if (solutions.length > 0 && solutions[0].path.length < next.path.length) {
      break;
    }
    if (
      next.path.length > 0 &&
      units.find(u => u.x === next.x && u.y === next.y)
    ) {
      solutions.push(next);
    }
    const options = neighbors(map, units, next, unit.type).filter(
      n => !visited.has(`${n.x},${n.y}`),
    );
    options.forEach(n => visited.add(`${n.x},${n.y}`));
    queue.push(...options);
  }
  if (solutions.length > 0) {
    return solutions
      .sort((a, b) => a.y - b.y || a.x - b.x)
      .shift()
      .path.shift();
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

function parse(input, elfBoost = 0) {
  const units = [];
  const map = input.replace(/[EG]/g, '.').split('\n');
  input.split('\n').forEach((row, y) =>
    row.split('').forEach((cell, x) => {
      if (cell === 'E') {
        units.push({ type: 'E', hit: 200, attack: 3 + elfBoost, x, y });
      } else if (cell === 'G') {
        units.push({ type: 'G', hit: 200, attack: 3, x, y });
      }
    }),
  );
  return { map, units };
}

function part1(input) {
  let i = 0;
  const { map, units } = parse(input);
  while (turn(map, units)) {
    i++;
  }
  return i * units.reduce((sum, u) => (sum += u.hit), 0);
}

function play({ map, units }) {
  let i = 0;
  const elfCount = units.filter(x => x.type === 'E').length;
  while (turn(map, units)) {
    i++;
  }
  if (elfCount === units.filter(x => x.type === 'E').length) {
    return i * units.reduce((sum, u) => (sum += u.hit), 0);
  }
}

function part2(input) {
  let result;
  let elfBoost = 1;
  while (!(result = play(parse(input, elfBoost)))) {
    elfBoost++;
  }
  return result;
}

module.exports = { part1, part2 };
