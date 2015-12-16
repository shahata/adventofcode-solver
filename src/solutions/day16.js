'use strict';

export function day16(input) {
  let expect1 = {
    id: () => true,
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  let expect2 = Object.assign({}, expect1, {
    cats: x => x > expect1.cats,
    trees: x => x > expect1.trees,
    pomeranians: x => x < expect1.pomeranians,
    goldfish: x => x < expect1.goldfish
  });

  function parseMap(s, p1, p2) {
    return s.split(p1).map(x => x.split(p2))
            .reduce((obj, pair) => Object.assign(obj, {[pair[0]]: parseInt(pair[1], 10)}), {});
  }

  function matches(x, expect) {
    return Object.keys(x).every(key => {
      return typeof expect[key] === 'function' ? expect[key](x[key]) : expect[key] === x[key];
    });
  }

  let sues = input.split('\n')
                  .map(x => x.match(/^Sue ([^:]*): (.*)/).slice(1))
                  .map(x => [x[0], parseMap(x[1], ', ', ': ')])
                  .map(x => Object.assign({id: x[0]}, x[1]));

  let part1 = sues.filter(x => matches(x, expect1)).map(x => x.id).shift();
  let part2 = sues.filter(x => matches(x, expect2)).map(x => x.id).shift();

  return [part1, part2];
}
