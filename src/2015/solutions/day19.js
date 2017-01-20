'use strict';

function day(input) {
  function calcNeighbors(molecule, replacements) {
    return replacements.reduce((result, pair) => {
      const regexp = new RegExp(pair.from, 'g');
      while (regexp.exec(molecule)) {
        result.push(molecule.slice(0, regexp.lastIndex - pair.from.length) +
                    pair.to + molecule.slice(regexp.lastIndex));
      }
      return result;
    }, []).sort().filter((x, index, arr) => x !== arr[index - 1]);
  }

  function calcDistance(src, dest, replacements) {
    let queue = [dest];
    const cost = {[dest]: 0};
    const heuristic = p => cost[p] + p.length - src.length;
    replacements = replacements.map(x => ({from: x.to, to: x.from}));

    while (queue.length) {
      const curr = queue.shift();
      if (curr === src) {
        return cost[src];
      }
      /* eslint no-loop-func: "off" */
      calcNeighbors(curr, replacements).forEach(next => {
        const newCost = cost[curr] + 1;
        if (!cost[next] || newCost < cost[next]) {
          cost[next] = newCost;
          queue.push(next);
        }
      });
      queue = queue.sort().filter((x, index, arr) => x !== arr[index - 1]);
      queue = queue.sort((a, b) => heuristic(a) - heuristic(b)); //A* priority queue
    }
  }

  input = input.split('\n');
  const molecule = input.pop();
  input.pop();
  const replacements = input.map(x => x.match(/^(\w+) => (\w+)$/))
                          .map(x => ({from: x[1], to: x[2]}));
  const part1 = calcNeighbors(molecule, replacements).length;
  const part2 = calcDistance('e', molecule, replacements);
  return [part1, part2];
}

module.exports = day;
