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
    const value = map.get(`${current.x},${current.y}`) || { ids: 0, tracks: 0 };
    map.set(`${current.x},${current.y}`, {
      ids: value.ids + current.id,
      tracks: value.tracks + current.track,
    });
  }
}

function draw(map, line, id) {
  const steps = line.split(',');
  let current = { x: 0, y: 0, track: 0, id };
  steps.forEach(s => {
    const [, direction, times] = s.match(/^(.)(\d+)$/);
    mark(map, current, direction, +times);
  });
}

export function part1(input) {
  const [line1, line2] = input.split('\n');
  const map = new Map();
  draw(map, line1, 1);
  draw(map, line2, 2);
  const distances = Array.from(map.entries())
    .filter(entry => entry[1].ids === 3)
    .map(entry => {
      return entry[0]
        .split(',')
        .map(x => Math.abs(+x))
        .reduce((a, b) => a + b);
    });
  return Math.min(...distances);
}

export function part2(input) {
  const [line1, line2] = input.split('\n');
  const map = new Map();
  draw(map, line1, 1);
  draw(map, line2, 2);
  const distances = Array.from(map.values())
    .filter(x => x.ids === 3)
    .map(x => x.tracks);
  return Math.min(...distances);
}
