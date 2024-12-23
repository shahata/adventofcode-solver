function addOneToNetworks(networks, map) {
  let set = new Set();
  networks.forEach(computers => {
    let candidates = computers.map(c => map.get(c));
    let result = candidates.reduce((a, b) => a.intersection(b));
    result.forEach(x => set.add([...computers, x].sort().join(",")));
  });
  return set;
}

function parse(input) {
  let networks = input.split("\n").map(line => line.split("-"));
  let map = new Map();
  networks.forEach(pair => {
    map.set(pair[0], (map.get(pair[0]) || new Set()).add(pair[1]));
    map.set(pair[1], (map.get(pair[1]) || new Set()).add(pair[0]));
  });
  return { networks, map };
}

export function part1(input) {
  let { networks, map } = parse(input);
  let set = addOneToNetworks(networks, map);
  return [...set].filter(x => x.match(/(^t|,t)/)).length;
}

export function part2(input) {
  let { networks, map } = parse(input);
  while (networks.length > 1) {
    let next = addOneToNetworks(networks, map);
    networks = [...next].map(x => x.split(","));
  }
  return networks[0].sort().join(",");
}
