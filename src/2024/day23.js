function unique(networks) {
  networks = networks.map(x => x.sort().join(","));
  return [...new Set(networks)].map(x => x.split(","));
}

function addOneToNetworks(networks, map) {
  networks = networks.flatMap(computers => {
    let candidates = computers.map(c => map.get(c));
    let result = [...candidates.reduce((a, b) => a.intersection(b))];
    return result.map(x => [...computers, x]);
  });
  return unique(networks);
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
  networks = addOneToNetworks(networks, map);
  networks = networks.filter(c => c.some(x => x.startsWith("t")));
  return networks.length;
}

export function part2(input) {
  let { networks, map } = parse(input);
  while (networks.length > 1) networks = addOneToNetworks(networks, map);
  return networks[0].sort().join(",");
}
