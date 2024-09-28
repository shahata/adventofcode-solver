export function part1(input) {
  let [timestamp, buses] = input.split('\n');
  timestamp = +timestamp;
  buses = buses
    .split(',')
    .filter(x => x !== 'x')
    .map(Number);

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

export function part2(input) {
  const buses = input
    .split('\n')
    .pop()
    .split(',')
    .map((x, i) => ({ id: +x, offset: i }))
    .filter(({ id }) => !isNaN(id));

  let result = 0;
  let step = 1;
  buses.forEach(({ id, offset }) => {
    while ((result + offset) % id !== 0) {
      result += step;
    }
    step *= id; //assumes bus numbers do not have common divisors
  });
  return result;
}
