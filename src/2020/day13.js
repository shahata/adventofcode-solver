export function part1(input) {
  let [timestamp, buses] = input.split('\n');
  timestamp = +timestamp;
  buses = buses
    .split(',')
    .filter(x => x !== 'x')
    .map(x => +x);

  const next = buses.map(x => {
    let result = 0;
    while (result < timestamp) {
      result += x;
    }
    return result;
  });
  const time = Math.min(...next);
  return (time - timestamp) * buses[next.indexOf(time)];
}

export function part2(input, base = 100000000000000) {
  let buses = input
    .split('\n')
    .pop()
    .split(',')
    .map((x, i) => ({ id: +x, offset: i }))
    .filter(({ id }) => !isNaN(id));

  let timestamp = base;
  let step = 1;
  buses.forEach(({ id, offset }) => {
    while ((timestamp + offset) % id !== 0) {
      timestamp += step;
    }
    step *= id;
  });
  return timestamp;
}
