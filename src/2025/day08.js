function circuitSizes(junctions) {
  let circuitCounts = new Map();
  for (let { circuit } of junctions) {
    if (circuit === null) continue;
    circuitCounts.set(circuit, (circuitCounts.get(circuit) || 0) + 1);
  }
  return Array.from(circuitCounts.values()).sort((a, b) => b - a);
}

function connectPair(pair, junctions) {
  let { a, b } = pair;
  if (a.circuit === null && b.circuit === null) {
    a.circuit = b.circuit = Symbol();
  } else if (a.circuit === null || b.circuit === null) {
    a.circuit = b.circuit = a.circuit || b.circuit;
  } else if (a.circuit !== b.circuit) {
    junctions
      .filter(junction => junction.circuit === b.circuit)
      .forEach(junction => (junction.circuit = a.circuit));
  }
  return pair;
}

function allConnected(junctions) {
  let firstCircuit = junctions[0].circuit;
  return (
    firstCircuit !== null &&
    junctions.every(junction => junction.circuit === firstCircuit)
  );
}

function parse(input) {
  let junctions = input.split("\n").map(line => {
    let [x, y, z] = line.split(",").map(Number);
    return { x, y, z, circuit: null };
  });
  let pairs = [];
  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      let a = junctions[i];
      let b = junctions[j];
      let dist = Math.sqrt(
        (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
      );
      pairs.push({ a, b, dist });
    }
  }
  return { junctions, pairs: pairs.sort((p1, p2) => p1.dist - p2.dist) };
}

export function part1(input, times = 1000) {
  let { junctions, pairs } = parse(input);
  for (let i = 0; i < times; i++) connectPair(pairs[i], junctions);
  return circuitSizes(junctions)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
}

export function part2(input) {
  let pair;
  let { junctions, pairs } = parse(input);
  while (!allConnected(junctions)) pair = connectPair(pairs.shift(), junctions);
  return pair.a.x * pair.b.x;
}
