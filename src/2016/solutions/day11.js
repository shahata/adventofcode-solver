const Combinatorics = require('js-combinatorics');

function parse(input) {
  let count = 0;
  const state = {elevator: 0, floors: input.split('\n').map(x => {
    const generators = x.match(/[^\s]+(?=\s*generator)/g) || [];
    const microchips = x.match(/[^\s]+(?=-compatible microchip)/g) || [];
    count += generators.length + microchips.length;
    return {generators, microchips};
  })};
  state.pieces = count;
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

function getMoves(state, diff) {
  const src = state.floors[state.elevator];
  const dest = state.floors[state.elevator + diff];
  const pairs = src.generators.filter(x => src.microchips.includes(x));
  const microchips = dest.generators.length === 0 ? src.microchips : src.microchips.filter(x => dest.generators.includes(x));
  const generators = dest.microchips.length === 0 ? src.generators : src.generators.filter(x => dest.microchips.includes(x));
  return pairs.map(x => ({generators: [x], microchips: [x]}))
    .concat(select(microchips, 2).map(x => ({microchips: x, generators: []})))
    .concat(select(generators, 2).map(x => ({generators: x, microchips: []})))
    .map(move => applyMove(state, diff, move));
}

function getNeighbors(state) {
  let neighbors = [];
  if (state.elevator > 0) {
    neighbors = neighbors.concat(getMoves(state, -1));
  }
  if (state.elevator < state.floors.length - 1) {
    neighbors = neighbors.concat(getMoves(state, 1));
  }
  return neighbors;
}

function solve(state) {
  const queue = [{distance: 0, state}];
  const visited = new Set().add(JSON.stringify(state));
  while (queue.length > 0) {
    const {distance, state} = queue.shift();
    const {generators, microchips} = state.floors[state.floors.length - 1];
    if (state.pieces === generators.length + microchips.length) {
      return distance;
    } else {
      const neighbors = getNeighbors(state).filter(x => !visited.has(JSON.stringify(x)));
      neighbors.forEach(x => {
        const json = JSON.stringify(x);
        if (!visited.has(json)) {
          visited.add(json);
          queue.push({distance: distance + 1, state: x});
        }
      });
    }
  }
}

function day(input) {
  const part1 = solve(parse(input));
  const part2 = input;
  return [part1, part2];
}

module.exports = {day};
