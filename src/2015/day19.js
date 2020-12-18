import { lines } from '../utils/commons.js';

function calcNeighbors({ molecule, replacements }) {
  const results = new Set();
  replacements.forEach(pair => {
    const regexp = new RegExp(pair.from, 'g');
    while (regexp.exec(molecule)) {
      const a = molecule.slice(0, regexp.lastIndex - pair.from.length);
      const b = molecule.slice(regexp.lastIndex);
      results.add(a + pair.to + b);
    }
  });
  return results;
}

function calcDistance({ molecule, replacements }) {
  const elements = molecule.match(/[A-Z]/g).length;
  const wrappers = (molecule.match(/(Rn|Ar)/g) || { length: 0 }).length;
  const separators = (molecule.match(/Y/g) || { length: 0 }).length;
  const last = replacements.find(x => x.from === 'e').to.length - 1;
  return elements - wrappers - separators * 2 - last;
}

function parse(input) {
  input = lines(input);
  const molecule = input.pop();
  input.pop();
  const replacements = input
    .map(x => x.match(/^(\w+) => (\w+)$/))
    .map(([, from, to]) => ({ from, to }));
  return { molecule, replacements };
}

export const part1 = input => calcNeighbors(parse(input)).size;
export const part2 = input => calcDistance(parse(input));
