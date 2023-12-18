function solve(lines) {
  let pos = { x: 0, y: 0 };
  let outline = 1;
  let area = 0;

  for (const { direction, count } of lines) {
    let next;
    if (direction === 'L') next = { x: pos.x - count, y: pos.y };
    if (direction === 'R') next = { x: pos.x + count, y: pos.y };
    if (direction === 'U') next = { x: pos.x, y: pos.y - count };
    if (direction === 'D') next = { x: pos.x, y: pos.y + count };
    area += (pos.x * next.y - pos.y * next.x) / 2;
    outline += count / 2;
    pos = next;
  }
  return Math.abs(area) + outline;
}

export function part1(input) {
  const lines = input.split('\n').map(line => {
    const [direction, count] = line.split(' ');
    return { direction, count: +count };
  });
  return solve(lines);
}

export function part2(input) {
  const lines = input.split('\n').map(line => {
    let [direction, count, color] = line.split(' ');
    count = parseInt(color.slice(2, -2), 16);
    direction = 'RDLU'.at(color.slice(-2, -1));
    return { direction, count };
  });
  return solve(lines);
}
