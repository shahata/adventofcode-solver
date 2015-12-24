'use strict';

import Combinatorics from 'js-combinatorics';

export function day24(input) {
  function f(boxes, total, part) {
    let rest = (all, sub) => all.filter(x => sub.indexOf(x) === -1);
    let product = x => x.reduce((p, x) => p * x);

    for (var i = 1; i <= boxes.length; i++) {
      let options = Combinatorics.combination(boxes, i)
                                 .filter(a => a.reduce((s, x) => s + x) === total);
      if (options.length) {
        if (part === 1) {
          return true;
        } else {
          let good = options.sort((a, b) => product(a) - product(b))
                            .find(x => f(rest(boxes, x), total, part - 1));
          return product(good);
        }
      }
    }
  }

  let boxes = input.split('\n').map(x => parseInt(x, 10));
  let total = boxes.reduce((sum, x) => sum + x);

  let part1 = f(boxes, total / 3, 3);
  let part2 = f(boxes, total / 4, 4);
  return [part1, JSON.stringify(part2)];
}
