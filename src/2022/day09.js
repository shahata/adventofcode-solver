export function part1(input, len = 2) {
  const steps = input.split('\n').map(line => {
    const [direction, count] = line.split(' ');
    return { direction, count: +count };
  });
  const knots = new Array(len).fill().map(() => ({ x: 0, y: 0 }));
  const visited = new Set([`${knots[len - 1].x},${knots[len - 1].y}`]);
  for (const step of steps) {
    for (let i = 0; i < step.count; i++) {
      if (step.direction === 'R') knots[0].x++;
      if (step.direction === 'L') knots[0].x--;
      if (step.direction === 'D') knots[0].y++;
      if (step.direction === 'U') knots[0].y--;
      for (let j = 1; j < knots.length; j++) {
        const [H, T] = [knots[j - 1], knots[j]];
        if (Math.abs(H.x - T.x) === 2 || Math.abs(H.y - T.y) === 2) {
          T.x = H.x === T.x ? T.x : H.x > T.x ? T.x + 1 : T.x - 1;
          T.y = H.y === T.y ? T.y : H.y > T.y ? T.y + 1 : T.y - 1;
        }
      }
      visited.add(`${knots[len - 1].x},${knots[len - 1].y}`);
    }
  }
  return visited.size;
}

export function part2(input) {
  return part1(input, 10);
}
