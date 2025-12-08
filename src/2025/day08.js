function straightLineDistance3D(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function top3Circuits(junctions) {
  let circuitCounts = new Map();
  for (let junction of junctions) {
    if (junction.circuit === null) continue;
    circuitCounts.set(
      junction.circuit,
      (circuitCounts.get(junction.circuit) || 0) + 1,
    );
  }
  let counts = Array.from(circuitCounts.values());
  counts.sort((a, b) => b - a);
  return counts.slice(0, 3).reduce((a, b) => a * b, 1);
}

function getAllPairs(junctions) {
  let pairs = [];
  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      let a = junctions[i];
      let b = junctions[j];
      let dist = straightLineDistance3D(a, b);
      pairs.push({ a, b, dist });
    }
  }
  return pairs.sort((p1, p2) => p1.dist - p2.dist);
}

function connectPair(pair, junctions) {
  let { a, b } = pair;
  if (a.circuit === null && b.circuit === null) {
    a.circuit = b.circuit = Symbol();
  } else if (a.circuit !== null && b.circuit === null) {
    b.circuit = a.circuit;
  } else if (a.circuit === null && b.circuit !== null) {
    a.circuit = b.circuit;
  } else if (a.circuit !== b.circuit) {
    let oldCircuit = b.circuit;
    let newCircuit = a.circuit;
    for (let j = 0; j < junctions.length; j++) {
      if (junctions[j].circuit === oldCircuit) {
        junctions[j].circuit = newCircuit;
      }
    }
  }
  return pair;
}

function allConnected(junctions) {
  let firstCircuit = junctions[0].circuit;
  if (firstCircuit === null) return false;
  for (let junction of junctions) {
    if (junction.circuit !== firstCircuit) {
      return false;
    }
  }
  return true;
}

export function part1(input, times = 1000) {
  let junctions = input.split("\n").map(line => {
    let [x, y, z] = line.split(",").map(Number);
    return { x, y, z, circuit: null };
  });
  let pairs = getAllPairs(junctions).slice(0, times);
  for (let i = 0; i < pairs.length; i++) connectPair(pairs[i], junctions);
  return top3Circuits(junctions);
}

export function part2(input) {
  let junctions = input.split("\n").map(line => {
    let [x, y, z] = line.split(",").map(Number);
    return { x, y, z, circuit: null };
  });
  let pair;
  let pairs = getAllPairs(junctions);
  while (!allConnected(junctions)) pair = connectPair(pairs.shift(), junctions);
  return pair.a.x * pair.b.x;
}
