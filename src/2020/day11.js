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

function neighbors(seats, x, y) {
  return directions
    .map(direction => {
      const point = direction({ x, y });
      return seats[point.y] && seats[point.y][point.x] === '#' ? 1 : 0;
    })
    .reduce((a, b) => a + b);
}

function neighbors2(seats, x, y) {
  return directions
    .map(direction => {
      let point = { x, y };
      let value;
      do {
        point = direction(point);
        value = seats[point.y] && seats[point.y][point.x];
      } while (value === '.');
      return value === '#' ? 1 : 0;
    })
    .reduce((a, b) => a + b);
}

function life(input, neighborsFn, neighborsCount) {
  let seats = input.split('\n').map(x => x.split(''));
  let count = 0;
  let prev = 0;
  do {
    seats = seats.map((line, y) => {
      return line.map((seat, x) => {
        if (seat !== '.') {
          const occupied = neighborsFn(seats, x, y);
          if (seat === 'L' && occupied === 0) return '#';
          if (seat === '#' && occupied >= neighborsCount) return 'L';
        }
        return seat;
      });
    });
    prev = count;
    count = seats
      .map(line => line.map(x => (x === '#' ? 1 : 0)).reduce((a, b) => a + b))
      .reduce((a, b) => a + b);
  } while (count !== prev);
  return count;
}

export function part1(input) {
  return life(input, neighbors, 4);
}

export function part2(input) {
  return life(input, neighbors2, 5);
}
