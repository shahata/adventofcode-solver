function read(wiresMap, prefix) {
  let out = [...wiresMap.keys().filter(x => x.startsWith(prefix))];
  out = out.sort().reverse();
  return out.map(x => wiresMap.get(x)).join("");
}

function run(gates, wiresMap) {
  let done = false;
  while (!done) {
    done = true;
    gates.forEach(({ a, op, b, wire }) => {
      a = wiresMap.get(a);
      b = wiresMap.get(b);
      if (a !== undefined && b !== undefined) {
        if (op === "AND") wiresMap.set(wire, a & b);
        if (op === "OR") wiresMap.set(wire, a | b);
        if (op === "XOR") wiresMap.set(wire, a ^ b);
      } else done = false;
    });
  }
  return parseInt(read(wiresMap, "z"), 2);
}

function parse(input) {
  let [wires, gates] = input.split("\n\n");
  let wiresMap = new Map();
  wires.split("\n").forEach(line => {
    let [wire, value] = line.split(": ");
    wiresMap.set(wire, +value);
  });
  gates = gates.split("\n").map(line => {
    let [a, op, b, , wire] = line.split(" ");
    [a, b] = [a, b].sort();
    return { a, op, b, wire };
  });
  return { wiresMap, gates };
}

export function part1(input) {
  let { wiresMap, gates } = parse(input);
  return run(gates, wiresMap);
}

// full adder
// https://www.build-electronic-circuits.com/wp-content/uploads/2022/10/fullAdder-1-1024x473.png
// X XOR Y => M
// X AND Y => N
// CIN XOR M => Z
// CIN AND M => R
// R OR  N => COUT
export function part2(input) {
  let { gates, wiresMap } = parse(input);
  function find(a, b, op) {
    [a, b] = [a, b].sort();
    return gates.find(x => x.a === a && x.b === b && x.op === op)?.wire;
  }
  let swapped = [];
  let { length } = read(wiresMap, "x");
  let cin = find("x00", "y00", "AND");
  for (let i = 1; i < length; i++) {
    let num = i.toString().padStart(2, "0");
    let m = find(`x${num}`, `y${num}`, "XOR");
    let n = find(`x${num}`, `y${num}`, "AND");
    if (find(cin, n, "XOR")) swapped.push(...([m, n] = [n, m]));
    let z = find(cin, m, "XOR");
    let r = find(cin, m, "AND");
    if (find(r, z, "OR")) swapped.push(...([n, z] = [z, n]));
    if (find(n, z, "OR")) swapped.push(...([r, z] = [z, r]));
    let cout = find(r, n, "OR");
    if (cout === `z${num}`) swapped.push(...([z, cout] = [cout, z]));
    cin = cout;
  }
  return swapped.sort().join(",");
}
