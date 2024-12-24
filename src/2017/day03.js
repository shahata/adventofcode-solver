function solve1(destination) {
  let radius = 0;
  let multiplier = 0;
  while (8 * multiplier + 1 < destination) {
    radius++;
    multiplier += radius;
  }
  let bottomRight = 8 * multiplier + 1;
  let bottomLeft = bottomRight - radius * 2;
  let topLeft = bottomLeft - radius * 2;
  let topRight = topLeft - radius * 2;
  let fromCorner = Math.min(
    Math.abs(topRight - destination),
    Math.abs(bottomLeft - destination),
  );
  return radius * 2 - Math.min(fromCorner, radius * 2 - fromCorner);
}

function toKey({ x, y }) {
  return `${x}-${y}`;
}

function next({ position: { x, y }, direction }) {
  let directions = {
    R: { x: x + 1, y },
    L: { x: x - 1, y },
    U: { x, y: y - 1 },
    D: { x, y: y + 1 },
  };
  return directions[direction];
}

function calc({ position, map }) {
  let { x, y } = position;
  return [
    map[toKey({ x: x - 1, y: y - 1 })] || 0,
    map[toKey({ x: x + 0, y: y - 1 })] || 0,
    map[toKey({ x: x + 1, y: y - 1 })] || 0,
    map[toKey({ x: x - 1, y: y + 0 })] || 0,
    map[toKey({ x: x + 1, y: y + 0 })] || 0,
    map[toKey({ x: x - 1, y: y + 1 })] || 0,
    map[toKey({ x: x + 0, y: y + 1 })] || 0,
    map[toKey({ x: x + 1, y: y + 1 })] || 0,
  ].reduce((sum, x) => sum + x);
}

function direction({ position, direction, map }) {
  switch (direction) {
    case "R":
      return map[toKey(next({ position, direction: "U" }))] ? direction : "U";
    case "L":
      return map[toKey(next({ position, direction: "D" }))] ? direction : "D";
    case "U":
      return map[toKey(next({ position, direction: "L" }))] ? direction : "L";
    case "D":
      return map[toKey(next({ position, direction: "R" }))] ? direction : "R";
    default:
  }
}

function solve2(destination) {
  let state = {
    position: { x: 0, y: 0 },
    direction: "R",
    map: { [toKey({ x: 0, y: 0 })]: 1 },
  };
  let current = 1;
  while (current <= destination) {
    state.position = next(state);
    current = state.map[toKey(state.position)] = calc(state);
    state.direction = direction(state);
  }
  return current;
}

export function part1(input) {
  return solve1(+input);
}

export function part2(input) {
  return solve2(+input);
}
