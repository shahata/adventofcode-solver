function mark(map, current, direction, times) {
  for (let i = 0; i < times; i++) {
    if (direction === 'U') {
      current.y--;
    } else if (direction === 'D') {
      current.y++;
    } else if (direction === 'L') {
      current.x--;
    } else if (direction === 'R') {
      current.x++;
    }
    current.track++;
    map[`${current.x},${current.y}`] = map[`${current.x},${current.y}`] || {
      ids: 0,
      tracks: 0,
    };
    map[`${current.x},${current.y}`].ids += current.id;
    map[`${current.x},${current.y}`].tracks += current.track;
  }
}

function draw(map, line, id) {
  const steps = line.split(',');
  let current = { x: 0, y: 0, track: 0, id };
  steps.forEach(s => {
    const [, direction, times] = s.match(/^(.)(\d+)$/);
    mark(map, current, direction, parseInt(times));
  });
}

export function part1(input) {
  const [line1, line2] = input.split('\n');
  const map = {};
  draw(map, line1, 1);
  draw(map, line2, 2);
  const distances = Object.keys(map)
    .filter(k => map[k].ids === 3)
    .map(k => {
      return k
        .split(',')
        .map(x => Math.abs(parseInt(x)))
        .reduce((a, b) => a + b);
    });
  return Math.min(...distances);
}

export function part2(input) {
  const [line1, line2] = input.split('\n');
  const map = {};
  draw(map, line1, 1);
  draw(map, line2, 2);
  const distances = Object.values(map)
    .filter(x => x.ids === 3)
    .map(x => x.tracks);
  return Math.min(...distances);
}
