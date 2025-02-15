function read(wiresMap, prefix) {
  let out = [...wiresMap.keys().filter(x => x.startsWith(prefix))];
  out = out.sort().reverse();
  return out.map(x => wiresMap.get(x)).join("");
}

const ops = { AND: (a, b) => a & b, OR: (a, b) => a | b, XOR: (a, b) => a ^ b };
function run(gates, wiresMap) {
  let done = false;
  while (!done) {
    done = true;
    gates.forEach(({ a, op, b, wire }) => {
      a = wiresMap.get(a);
      b = wiresMap.get(b);
      let c = wiresMap.get(wire);
      if (a !== undefined && b !== undefined && c === undefined) {
        done = false;
        wiresMap.set(wire, ops[op](a, b));
      }
    });
  }
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
  run(gates, wiresMap);
  return parseInt(read(wiresMap, "z"), 2);
}

function extractUnit(gates, i) {
  let num = i.toString().padStart(2, "0");
  let next = (i + 1).toString().padStart(2, "0");
  let more = gates.filter(x => x.a === `x${num}` && x.b === `y${num}`);
  let not = gates.filter(x => x.a === `x${next}` && x.b === `y${next}`);
  not = not.map(x => x.wire);

  let unit = [];
  while (more.length) {
    let wires = more.map(x => x.wire);
    unit.push(...more);
    more = gates.filter(x => wires.includes(x.a) || wires.includes(x.b));
    more = more.filter(x => !not.includes(x.a) && !not.includes(x.b));
  }
  return unit;
}

function unitTest(gates) {
  let intoGates = new Set(gates.flatMap(x => [x.a, x.b]));
  let outOfGates = new Set(gates.map(x => x.wire));
  let inputs = [...intoGates.difference(outOfGates)].sort();
  let outputs = [...outOfGates.difference(intoGates)].sort();
  if (outputs.every(x => x.startsWith("z"))) outputs.reverse();
  for (let i = 0; i < 2 ** inputs.length; i++) {
    let wiresMap = new Map();
    let binary = i.toString(2);
    inputs.forEach((x, j) => wiresMap.set(x, +binary[j]));
    run(gates, wiresMap);
    let result = parseInt(outputs.map(x => wiresMap.get(x)).join(""), 2);
    let expect = binary.split("").reduce((a, b) => +a + +b, 0);
    if (result !== expect) return false;
  }
  return true;
}

function getSwamps(unit) {
  let options = [];
  for (let i = 0; i < unit.length; i++) {
    for (let j = i + 1; j < unit.length; j++) {
      let gates = unit.map(x => ({ ...x }));
      [gates[i].wire, gates[j].wire] = [gates[j].wire, gates[i].wire];
      options.push({ swap: [gates[i].wire, gates[j].wire], gates });
    }
  }
  return options;
}

export function part2(input) {
  let { wiresMap, gates } = parse(input);
  let { length } = read(wiresMap, "x");
  let swapped = [];
  for (let i = 0; i < length; i++) {
    let unit = extractUnit(gates, i);
    if (!unitTest(unit)) {
      let { swap } = getSwamps(unit).find(x => unitTest(x.gates));
      swapped.push(...swap);
    }
  }
  return swapped.sort().join(",");
}

// Shorter but much more involved solution adapted from reddit
// https://www.build-electronic-circuits.com/wp-content/uploads/2022/10/fullAdder-1-1024x473.png
// X XOR Y => M
// X AND Y => N
// CIN XOR M => Z
// CIN AND M => R
// R OR  N => COUT
// export function part2(input) {
//   let { wiresMap, gates } = parse(input);
//   function find(a, b, op) {
//     [a, b] = [a, b].sort();
//     return gates.find(x => x.a === a && x.b === b && x.op === op)?.wire;
//   }
//   let swapped = [];
//   let { length } = read(wiresMap, "x");
//   let cin = find("x00", "y00", "AND");
//   for (let i = 1; i < length; i++) {
//     let num = i.toString().padStart(2, "0");
//     let m = find(`x${num}`, `y${num}`, "XOR");
//     let n = find(`x${num}`, `y${num}`, "AND");
//     if (find(cin, n, "XOR")) swapped.push(...([m, n] = [n, m]));
//     let z = find(cin, m, "XOR");
//     let r = find(cin, m, "AND");
//     if (find(r, z, "OR")) swapped.push(...([n, z] = [z, n]));
//     if (find(n, z, "OR")) swapped.push(...([r, z] = [z, r]));
//     let cout = find(r, n, "OR");
//     if (cout === `z${num}`) swapped.push(...([z, cout] = [cout, z]));
//     cin = cout;
//   }
//   return swapped.sort().join(",");
// }
