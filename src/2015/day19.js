function calcNeighbors({ molecule, replacements }) {
  let results = new Set();
  replacements.forEach(pair => {
    let regexp = new RegExp(pair.from, "g");
    while (regexp.exec(molecule)) {
      let a = molecule.slice(0, regexp.lastIndex - pair.from.length);
      let b = molecule.slice(regexp.lastIndex);
      results.add(a + pair.to + b);
    }
  });
  return results;
}

function calcDistance({ molecule, replacements }) {
  let elements = molecule.match(/[A-Z]/g).length;
  let wrappers = (molecule.match(/(Rn|Ar)/g) || { length: 0 }).length;
  let separators = (molecule.match(/Y/g) || { length: 0 }).length;
  let last = replacements.find(x => x.from === "e").to.length - 1;
  return elements - wrappers - separators * 2 - last;
}

function parse(input) {
  input = input.split("\n");
  let molecule = input.pop();
  input.pop();
  let replacements = input
    .map(x => x.match(/^(\w+) => (\w+)$/))
    .map(([, from, to]) => ({ from, to }));
  return { molecule, replacements };
}

export function part1(input) {
  return calcNeighbors(parse(input)).size;
}

export function part2(input) {
  return calcDistance(parse(input));
}
