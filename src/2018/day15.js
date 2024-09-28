const pos = ({ x, y }) => `${x},${y}`;
const count = (units, type) => units.filter(u => u.type === type).length;

function attackIfPossible(map, units, unit) {
  const inRange = u => Math.abs(u.x - unit.x) + Math.abs(u.y - unit.y) === 1;
  const attack = units
    .filter(u => u.type !== unit.type && inRange(u))
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

function neighbors(map, units, next, type, forbidden) {
  const result = [
    { x: next.x, y: next.y - 1 },
    { x: next.x - 1, y: next.y },
    { x: next.x + 1, y: next.y },
    { x: next.x, y: next.y + 1 },
  ]
    .filter(p => map[p.y] && map[p.y][p.x] === '.' && !forbidden.has(pos(p)))
    .map(p => ({ ...p, move: next.move || p, length: next.length + 1 }));
  result.forEach(n => forbidden.add(pos(n)));
  return result;
}

function moveIfPossible(map, units, unit) {
  let solutionLength = Infinity;
  const solutions = [];
  const queue = [{ x: unit.x, y: unit.y, length: 0 }];
  const forbidden = new Set(units.filter(u => u.type === unit.type).map(pos));
  while (queue.length > 0 && queue[0].length <= solutionLength) {
    const next = queue.shift();
    if (units.find(u => pos(u) === pos(next) && u.type !== unit.type)) {
      solutions.push(next);
      solutionLength = next.length;
    }
    queue.push(...neighbors(map, units, next, unit.type, forbidden));
  }
  if (solutions.length > 0) {
    solutions.sort((a, b) => a.y - b.y || a.x - b.x);
    Object.assign(unit, solutions.shift().move);
  }
}

function turn(map, units) {
  units.sort((a, b) => a.y - b.y || a.x - b.x);
  for (let i = 0; i < units.length; i++) {
    if (count(units, 'E') === 0 || count(units, 'G') === 0) {
      return false;
    }
    const unit = units[i];
    if (!attackIfPossible(map, units, unit)) {
      moveIfPossible(map, units, unit);
      attackIfPossible(map, units, unit);
    }
    i = units.indexOf(unit); //in case something was removed
  }
  return true;
}

function fight(input, elfBoost = 0) {
  let i = 0;
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
  while (turn(map, units)) {
    i++;
  }
  return { i, units };
}

export function part1(input) {
  const { i, units } = fight(input);
  return i * units.reduce((sum, u) => sum + u.hit, 0);
}

export function part2(input) {
  const elfCount = input.match(/E/g).length;
  let elfBoost = 1;
  let i, units;
  do {
    ({ i, units } = fight(input, elfBoost));
    elfBoost++;
  } while (elfCount !== count(units, 'E'));
  return i * units.reduce((sum, u) => sum + u.hit, 0);
}
