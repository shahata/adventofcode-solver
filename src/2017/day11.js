function step({ x, y }, direction) {
  let directions = {
    s: { x: x + 0, y: y - 2 },
    n: { x: x + 0, y: y + 2 },
    w: { x: x - 2, y: y + 0 },
    e: { x: x + 2, y: y + 0 },
    sw: { x: x - 1, y: y - 1 },
    se: { x: x + 1, y: y - 1 },
    nw: { x: x - 1, y: y + 1 },
    ne: { x: x + 1, y: y + 1 },
  };
  return directions[direction];
}

function parse(input) {
  return input.split(",").reduce(step, { x: 0, y: 0 });
}

function parse2(input) {
  return input.split(",").reduce(
    ({ furthest, point }, direction) => {
      return {
        furthest: Math.max(furthest, distance(step(point, direction))),
        point: step(point, direction),
      };
    },
    { furthest: 0, point: { x: 0, y: 0 } },
  );
}

function distance({ x, y }) {
  let diagonal = Math.min(Math.abs(x), Math.abs(y));
  let straight = (Math.max(Math.abs(x), Math.abs(y)) - diagonal) / 2;
  return diagonal + straight;
}

export function part1(input) {
  return distance(parse(input));
}

export function part2(input) {
  return parse2(input).furthest;
}
