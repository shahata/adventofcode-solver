import { lcm } from "../utils/divisors.js";

function parse(input) {
  let [steps, maps] = input.split("\n\n");
  maps = maps.split("\n").reduce((acc, map) => {
    let [, key, L, R] = map.match(/^(.+) = \((.+), (.+)\)$/);
    return { ...acc, [key]: { L, R } };
  }, {});
  return { steps, maps };
}

function walk(key, steps, maps, dest = key => key === "ZZZ") {
  let count;
  for (count = 0; !dest(key); count++) {
    for (let i = 0; i < steps.length; i++) key = maps[key][steps[i]];
  }
  return count * steps.length;
}

export function part1(input) {
  let { steps, maps } = parse(input);
  return walk("AAA", steps, maps);
}

export function part2(input) {
  let { steps, maps } = parse(input);
  let keys = Object.keys(maps).filter(key => key.endsWith("A"));
  return lcm(keys.map(key => walk(key, steps, maps, key => key.endsWith("Z"))));
}
