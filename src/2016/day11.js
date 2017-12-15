const Combinatorics = require('js-combinatorics');

function parse(input) {
  let pieces = [];
  const state = {elevator: 0, floors: input.split('\n').map(x => {
    const generators = x.match(/[^\s]+(?=\s*generator)/g) || [];
    const microchips = x.match(/[^\s]+(?=-compatible microchip)/g) || [];
    pieces = pieces.concat(generators).concat(microchips);
    return {generators, microchips};
  })};
  state.pieces = pieces;
  return state;
}

function select(arr, num) {
  let selected = [];
  for (num = Math.min(num, arr.length); num > 0; num--) {
    selected = selected.concat(Combinatorics.combination(arr, num).toArray());
  }
  return selected;
}

function applyMove({elevator, floors, pieces}, diff, move) {
  return {
    elevator: elevator + diff, pieces, floors: floors.map((floor, i) => {
      if (i === elevator) {
        return {
          generators: floor.generators.filter(x => !move.generators.includes(x)),
          microchips: floor.microchips.filter(x => !move.microchips.includes(x))
        };
      } else if (i === elevator + diff) {
        return {
          generators: floor.generators.concat(move.generators),
          microchips: floor.microchips.concat(move.microchips)
        };
      } else {
        return floor;
      }
    })
  };
}

function legal(state) {
  return state.floors.every(floor => {
    return floor.generators.length === 0 || floor.microchips.every(m => floor.generators.includes(m));
  });
}

function getMoves(state, diff) {
  const src = state.floors[state.elevator];
  const pairs = src.generators.filter(x => src.microchips.includes(x));
  return pairs.map(x => ({generators: [x], microchips: [x]}))
    .concat(select(src.microchips, 2).map(x => ({microchips: x, generators: []})))
    .concat(select(src.generators, 2).map(x => ({generators: x, microchips: []})))
    .map(move => applyMove(state, diff, move)).filter(legal);
}

function score({state, distance}) {
  return distance + (state.floors.reduce((sum, x, i) => sum + (2 * (state.floors.length - i - 1) * (x.generators.length + x.microchips.length)), 0));
}

function getNeighbors(state) {
  let neighbors = [];
  if (state.elevator < state.floors.length - 1) {
    neighbors = neighbors.concat(getMoves(state, 1));
  }
  if (state.elevator > 0 && state.floors.some((x, i) => i < state.elevator && x.generators.length + x.microchips.length > 0)) {
    neighbors = neighbors.concat(getMoves(state, -1));
  }
  return neighbors;
}

function done(state) {
  const {generators, microchips} = state.floors[state.floors.length - 1];
  return state.pieces.length === generators.length + microchips.length;
}

// function print(state) {
//   const dic = {
//     promethium: 'P',
//     cobalt: 'T',
//     curium: 'C',
//     ruthenium: 'R',
//     plutonium: 'L',
//     elerium: 'E',
//     dilithium: 'D',
//     hydrogen: 'H',
//     lithium: 'M'
//   };
//   const str = state.floors.map((floor, i) => {
//     let str = `${i} `;
//     str += i === state.elevator ? 'E ' : '  ';
//     Object.keys(dic).filter(x => state.pieces.includes(x)).forEach(k => {
//       str += floor.generators.includes(k) ? `${dic[k]}G ` : '   ';
//       str += floor.microchips.includes(k) ? `${dic[k]}M ` : '   ';
//     });
//     return str;
//   }).reverse().join('\n');
//   return str;
// }

function stringify({elevator, floors}) {
  return JSON.stringify({elevator, floors: floors.map((floor, i) => {
    return {
      generators: floor.generators.map(x => i - floors.findIndex(f => f.microchips.includes(x))).sort(),
      microchips: floor.microchips.map(x => i - floors.findIndex(f => f.generators.includes(x))).sort()
    };
  })});
}

function solve(state) {
  const queue = [{distance: 0, state, path: [state]}];
  const visited = new Set().add(stringify(state));
  while (queue.length > 0) {
    const {state, distance, path} = queue.shift();
    const neighbors = getNeighbors(state).filter(x => !visited.has(stringify(x)));
    for (const x of neighbors) {
      const json = stringify(x);
      if (done(x)) {
        // path.concat(x).forEach(state => console.log(print(state), '\n----------------------'));
        return distance + 1;
      } else if (!visited.has(json)) {
        visited.add(json);
        queue.push({distance: distance + 1, state: x, path: path.concat(x)});
      }
    }
    queue.sort((a, b) => score(a) - score(b));
  }
}

function part1(input) {
  return solve(parse(input));
}

function part2(input) {
  const state = parse(input);
  state.floors[0].generators.push('elerium', 'dilithium');
  state.floors[0].microchips.push('elerium', 'dilithium');
  state.pieces.push('elerium', 'dilithium', 'elerium', 'dilithium');
  return solve(state);
}

function day(input) {
  return [part1(input), part2(input)];
}

module.exports = {day, part1, part2};
