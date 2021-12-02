const directions = [
  ({ x, y }) => ({ y: y - 1, x: x - 1 }),
  ({ x, y }) => ({ y: y - 1, x: x }),
  ({ x, y }) => ({ y: y - 1, x: x + 1 }),
  ({ x, y }) => ({ y: y, x: x - 1 }),
  ({ x, y }) => ({ y: y, x: x + 1 }),
  ({ x, y }) => ({ y: y + 1, x: x - 1 }),
  ({ x, y }) => ({ y: y + 1, x: x }),
  ({ x, y }) => ({ y: y + 1, x: x + 1 }),
];

function neighbors(seats, current, far) {
  return directions
    .map(direction => {
      let point = current;
      do {
        point = direction(point);
      } while (far && seats[point.y] && seats[point.y][point.x] === '.');
      return seats[point.y] && seats[point.y][point.x] === '#' ? 1 : 0;
    })
    .reduce((a, b) => a + b, 0);
}

function life(input, count, far) {
  let seats = input.split('\n').map(x => x.split(''));
  let occupied = 0;
  let prev = 0;
  do {
    seats = seats.map((line, y) =>
      line.map((seat, x) => {
        if (seat !== '.') {
          const n = neighbors(seats, { x, y }, far);
          if (seat === 'L' && n === 0) return '#';
          if (seat === '#' && n >= count) return 'L';
        }
        return seat;
      }),
    );
    prev = occupied;
    occupied = seats
      .map(line => line.map(x => (x === '#' ? 1 : 0)).reduce((a, b) => a + b))
      .reduce((a, b) => a + b);
  } while (occupied !== prev);
  return occupied;
}

export function part1(input) {
  return life(input, 4, false);
}

export function part2(input) {
  return life(input, 5, true);
}
