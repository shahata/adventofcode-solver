import { lcm } from '../utils/divisors.js';

function parse(input) {
  let [steps, maps] = input.split('\n\n');
  maps = maps.split('\n').reduce((acc, map) => {
    const [, node, L, R] = map.match(/^(.+) = \((.+), (.+)\)$/);
    return { ...acc, [node]: { L, R } };
  }, {});
  return { steps, maps };
}

function walk(current, steps, maps, dest = key => key === 'ZZZ') {
  let count = 0;
  for (count = 0; !dest(current); count++) {
    for (let i = 0; i < steps.length; i++) current = maps[current][steps[i]];
  }
  return count * steps.length;
}

export function part1(input) {
  const { steps, maps } = parse(input);
  return walk('AAA', steps, maps);
}

export function part2(input) {
  const { steps, maps } = parse(input);
  const keys = Object.keys(maps).filter(key => key.endsWith('A'));
  const counts = keys.map(x => walk(x, steps, maps, key => key.endsWith('Z')));
  return lcm(counts);
}
