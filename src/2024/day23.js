function addOneToNetworks(networks, connections = networks) {
  let set = new Set();
  networks.forEach(computers => {
    let candidates = computers
      .map(c => {
        return connections
          .filter(pair => pair.includes(c))
          .map(pair => pair.find(x => x !== c));
      })
      .map(x => new Set(x));
    let result = candidates.reduce((a, b) => a.intersection(b));
    result.forEach(x => set.add([...computers, x].sort().join(",")));
  });
  return set;
}

export function part1(input) {
  let connections = input.split("\n").map(line => line.split("-"));
  let set = addOneToNetworks(connections);
  return [...set].filter(x => x.match(/(^t|,t)/)).length;
}

export function part2(input) {
  let connections = input.split("\n").map(line => line.split("-"));
  let networks = connections;
  while (networks.length > 1) {
    let next = addOneToNetworks(networks, connections);
    networks = [...next].map(x => x.split(","));
  }
  return networks[0].sort().join(",");
}
