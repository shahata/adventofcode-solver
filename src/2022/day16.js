import { powerSet } from 'combinatorial-generators';

function split(all) {
  const selected = [...powerSet(all)].slice(1);
  const options = [];
  for (let i = 0; i < selected.length; i++) {
    const j = selected.findIndex(
      x =>
        selected[i].length + x.length === all.length &&
        new Set(selected[i].concat(x)).size === all.length,
    );
    options.push([selected[i], selected[j]]);
    selected.splice(j, 1);
  }
  return options;
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
      const remaining = time - distance - 1;
      const pressure = valves[id].rate * remaining;
      return pressure + best(valves, id, new Set(open).add(id), remaining);
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
  const results = split(all).map(([human, elephant]) => {
    return (
      best(valves, 'AA', new Set(human), 26) +
      best(valves, 'AA', new Set(elephant), 26)
    );
  });
  return Math.max(...results);
}
