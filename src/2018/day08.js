function value(arr, part1 = false) {
  let [childCount, metaCount] = arr.splice(0, 2);
  let children = new Array(childCount).fill().map(() => value(arr, part1));
  let result = arr.splice(0, metaCount);
  if (part1) {
    result = result.concat(children);
  } else if (childCount > 0) {
    result = result.map(x => children[x - 1] || 0);
  }
  return result.reduce((sum, x) => sum + x, 0);
}

export function part1(input) {
  return value(input.split(" ").map(Number), true);
}

export function part2(input) {
  return value(input.split(" ").map(Number));
}
