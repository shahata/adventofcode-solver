function mark(points, x, y) {
  points[`${x},${y}`] = (points[`${x},${y}`] || 0) + 1;
}

function direction(a, b) {
  return a === b ? 0 : a < b ? 1 : -1;
}

export function part1(input, diagonal = false) {
  let lines = input.split("\n").map(line => {
    let [from, to] = line.split(" -> ").map(x => x.split(",").map(Number));
    return { from, to };
  });

  let points = {};
  for (let line of lines) {
    let [i, j] = line.from;
    let iDirection = direction(i, line.to[0]);
    let jDirection = direction(j, line.to[1]);
    if (diagonal || iDirection === 0 || jDirection === 0) {
      while (i !== line.to[0] || j !== line.to[1]) {
        mark(points, i, j);
        i += iDirection;
        j += jDirection;
      }
      mark(points, line.to[0], line.to[1]);
    }
  }
  return Object.values(points).filter(x => x > 1).length;
}

export function part2(input) {
  return part1(input, true);
}
