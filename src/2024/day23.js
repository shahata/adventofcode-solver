function addOneToNetwork(network, connections = network) {
  let set = new Set();
  network.forEach(connection => {
    let as = connection
      .map(c => {
        return connections
          .filter(other => other.includes(c))
          .map(a => a.find(x => x !== c));
      })
      .map(a => new Set(a));
    let result = as.reduce((a, b) => a.intersection(b));
    result.forEach(x => set.add([...connection, x].sort().join(",")));
  });
  return set;
}

export function part1(input) {
  let connections = input.split("\n").map(line => {
    let [a, b] = line.split("-").sort();
    return [a, b];
  });
  let set = addOneToNetwork(connections);
  return [...set].filter(x => x.match(/(^t|,t)/)).length;
}

export function part2(input) {
  let connections = input.split("\n").map(line => {
    let [a, b] = line.split("-").sort();
    return [a, b];
  });
  let network = connections;
  while (network.length > 1) {
    let next = addOneToNetwork(network, connections);
    network = [...next].map(x => x.split(","));
  }
  return network[0].sort().join(",");
}
