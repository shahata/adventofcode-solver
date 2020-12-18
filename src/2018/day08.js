import { sum } from '../utils/commons.js';

function value(arr, part1 = false) {
  const [childCount, metaCount] = arr.splice(0, 2);
  const children = new Array(childCount).fill().map(() => value(arr, part1));
  let result = arr.splice(0, metaCount);
  if (part1) {
    result = result.concat(children);
  } else if (childCount > 0) {
    result = result.map(x => children[x - 1] || 0);
  }
  return sum(result);
}

export function part1(input) {
  return value(
    input.split(' ').map(x => +x),
    true,
  );
}

export function part2(input) {
  return value(input.split(' ').map(x => +x));
}
