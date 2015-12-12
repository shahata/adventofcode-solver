'use strict';

export function day12(input) {
  function deepSum(obj, ignore) {
    if (Array.isArray(obj)) {
      return obj.reduce((sum, x) => sum + deepSum(x, ignore), 0);
    } else if (typeof obj === 'object') {
      let values = Object.keys(obj).map(x => obj[x]);
      return ignore && values.indexOf(ignore) > -1 ? 0 : deepSum(values, ignore);
    } else {
      return typeof obj === 'number' ? obj : 0;
    }
  }

  let part1 = deepSum(JSON.parse(input));
  let part2 = deepSum(JSON.parse(input), 'red');
  return [part1, part2];
}
