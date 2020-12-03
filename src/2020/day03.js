export function part1(input, right = 3, down = 1) {
  const map = input
    .split('\n')
    .map(line => line.split('').map(x => (x === '#' ? 1 : 0)));
  let point = { x: 0, y: 0 };
  let trees = 0;
  while (point.y < map.length) {
    trees += map[point.y][point.x];
    point = { x: (point.x + right) % map[0].length, y: point.y + down };
  }
  return trees;
}

export function part2(input) {
  return (
    part1(input, 1, 1) *
    part1(input, 3, 1) *
    part1(input, 5, 1) *
    part1(input, 7, 1) *
    part1(input, 1, 2)
  );
}
