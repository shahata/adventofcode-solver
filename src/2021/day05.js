function mark(points, x, y) {
  points[`${x},${y}`] = (points[`${x},${y}`] || 0) + 1;
}

function direction(a, b) {
  return a === b ? 0 : a < b ? 1 : -1;
}

export function part1(input, diagonal = false) {
  const lines = input.split('\n').map(line => {
    const [from, to] = line.split(' -> ').map(x => x.split(',').map(x => +x));
    return { from, to };
  });

  const points = {};
  for (const line of lines) {
    let [i, j] = line.from;
    const iDirection = direction(i, line.to[0]);
    const jDirection = direction(j, line.to[1]);
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
