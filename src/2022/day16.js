import Combinatorics from 'js-combinatorics';

function select(arr) {
  let selected = [];
  for (let num = arr.length; num > 0; num--) {
    selected = selected.concat(Combinatorics.combination(arr, num).toArray());
  }
  return selected.concat([[]]);
}
function distance(valves, from, to) {
  const queue = [{ id: from, steps: 0 }];
  const visited = new Set(`${from},0`);
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.id === to) return current.steps;
    const neighbors = valves[current.id].destination
      .map(id => ({ id, steps: current.steps + 1 }))
      .filter(x => !visited.has(`${x.id},${x.steps}`));
    neighbors.forEach(x => visited.add(`${x.id},${x.steps}`));
    queue.push(...neighbors);
  }
}

function parse(input) {
  const valves = input
    .split('\n')
    .map(line => {
      const [, id, rate, destination] = line.match(
        /^Valve ([^\s]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/,
      );
      return { id, rate: +rate, destination: destination.split(', ') };
    })
    .reduce((obj, valve) => ({ ...obj, [valve.id]: valve }), {});
  Object.values(valves).forEach(valve => {
    valve.paths = Object.values(valves)
      .filter(({ id, rate }) => id !== valve.id && rate > 0)
      .map(({ id }) => ({ id, distance: distance(valves, valve.id, id) }));
  });
  return valves;
}

function best(valves, current, open, time) {
  if (time === 0) return 0;
  const results = valves[current].paths
    .filter(({ id, distance }) => !open.has(id) && time > distance)
    .map(({ id, distance }) => {
      const nextOpen = new Set(open).add(id);
      const pressure = valves[id].rate * (time - distance - 1);
      return pressure + best(valves, id, nextOpen, time - distance - 1);
    });
  return Math.max(0, ...results);
}

export function part1(input) {
  const valves = parse(input);
  return best(valves, 'AA', new Set(), 30);
}

export function part2(input) {
  const valves = parse(input);
  const all = Object.keys(valves).filter(id => valves[id].rate > 0);
  const options1 = select(all);
  const options2 = [];
  for (let i = 0; i < options1.length; i++) {
    const j = options1.findIndex(
      x =>
        options1[i].length + x.length === all.length &&
        new Set(options1[i].concat(x)).size === all.length,
    );
    options2.push(...options1.splice(j, 1));
  }
  let max = 0;
  for (let i = 0; i < options1.length; i++) {
    let result =
      best(valves, 'AA', new Set(options1[i]), 26) +
      best(valves, 'AA', new Set(options2[i]), 26);
    max = Math.max(max, result);
  }
  return max;
}
