import { combinations, permutations } from "combinatorial-generators";

function read(wiresMap, prefix) {
  const out = [
    ...wiresMap.entries().filter(([wire]) => wire.startsWith(prefix)),
  ];
  const n = out
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(x => x[1])
    .join("");
  return parseInt(n, 2);
}

function run(gates, wiresMap) {
  let done = false;
  while (!done) {
    done = true;
    gates.forEach(({ left, op, right, wire }) => {
      let a = wiresMap.get(left);
      let b = wiresMap.get(right);
      if (a !== undefined && b !== undefined) {
        if (op === "AND") {
          wiresMap.set(wire, a & b);
        } else if (op === "OR") {
          wiresMap.set(wire, a | b);
        } else if (op === "XOR") {
          wiresMap.set(wire, a ^ b);
        }
      } else done = false;
    });
  }
  return read(wiresMap, "z");
}

export function part1(input) {
  let [wires, gates] = input.split("\n\n");
  let wiresMap = new Map();
  wires.split("\n").forEach(line => {
    let [wire, value] = line.split(": ");
    wiresMap.set(wire, +value);
    return { wire, value: +value };
  });
  gates = gates.split("\n").map(line => {
    let [left, op, right, , wire] = line.split(" ");
    return { left, op, right, wire };
  });
  return run(gates, wiresMap);
}

//shameless rip off from reddit :(
export function part2(input) {
  let [, gates] = input.split("\n\n");
  gates = gates.split("\n");

  function find(a, b, op) {
    const gate = gates.find(
      gate =>
        gate.startsWith(`${a} ${op} ${b}`) ||
        gate.startsWith(`${b} ${op} ${a}`),
    );
    return gate?.split(" -> ").pop();
  }

  // half adder
  // X1 XOR Y1 => M1
  // X1 AND Y1 => N1
  // C0 AND M1 => R1
  // C0 XOR M1 -> Z1
  // R1 OR N1 -> C1
  let swapped = [];
  let c0 = null;
  for (let i = 0; i < 45; i++) {
    let n = i.toString().padStart(2, "0");
    let m1, n1, r1, z1, c1;
    m1 = find(`x${n}`, `y${n}`, "XOR");
    n1 = find(`x${n}`, `y${n}`, "AND");
    if (c0) {
      r1 = find(c0, m1, "AND");
      if (!r1) {
        [n1, m1] = [m1, n1];
        swapped.push(m1, n1);
        r1 = find(c0, m1, "AND");
      }

      z1 = find(c0, m1, "XOR");
      if (m1?.startsWith("z")) {
        [m1, z1] = [z1, m1];
        swapped.push(m1, z1);
      }
      if (n1?.startsWith("z")) {
        [n1, z1] = [z1, n1];
        swapped.push(n1, z1);
      }
      if (r1?.startsWith("z")) {
        [r1, z1] = [z1, r1];
        swapped.push(r1, z1);
      }

      c1 = find(r1, n1, "OR");
      if (c1?.startsWith("z") && c1 !== "z45") {
        [c1, z1] = [z1, c1];
        swapped.push(c1, z1);
      }
    }
    c0 = c1 || n1;
  }
  return swapped.sort().join(",");
}

// my slow solution, runs for ever...
export function oldpart2(input, n = 4, check = (x, y) => x + y) {
  let [wires, gates] = input.split("\n\n");
  let wiresMap = new Map();
  wires.split("\n").forEach(line => {
    let [wire, value] = line.split(": ");
    wiresMap.set(wire, +value);
    return { wire, value: +value };
  });
  gates = gates.split("\n").map(line => {
    let [left, op, right, , wire] = line.split(" ");
    return { left, op, right, wire };
  });
  let pairs = combinations(
    gates.map(({ wire }) => wire),
    2 * n,
  );
  let x = read(wiresMap, "x");
  let y = read(wiresMap, "y");
  let found = pairs.find(pair => {
    let options = permutations(pair);
    return options.find(permutation => {
      let replacements = new Map();
      for (let i = 0; i < permutation.length; i += 2) {
        if (permutation[i].localeCompare(permutation[i + 1]) < 0) return false;
        replacements.set(permutation[i], permutation[i + 1]);
        replacements.set(permutation[i + 1], permutation[i]);
      }
      let newGates = gates.map(({ left, op, right, wire }) => {
        return {
          left,
          op,
          right,
          wire: replacements.get(wire) || wire,
        };
      });
      let newWiresMap = new Map(wiresMap.entries());
      if (run(newGates, newWiresMap) === check(x, y)) {
        //try another number just to make sure addition works
        newWiresMap.set("x04", 1);
        let x = read(newWiresMap, "x");
        let y = read(newWiresMap, "y");
        let newGates = gates.map(({ left, op, right, wire }) => {
          return {
            left,
            op,
            right,
            wire: replacements.get(wire) || wire,
          };
        });
        if (run(newGates, newWiresMap) === check(x, y)) return true;
      }
    });
  });
  return found.sort().join(","); //?
}
