function metadata(arr, part2 = false) {
  let result = [];
  const [childNum, metaNum] = arr.splice(0, 2);
  for (let i = 0; i < childNum; i++) {
    result.push(metadata(arr, part2));
  }
  result = result.concat(arr.splice(0, metaNum));
  if (part2 && childNum > 0) {
    const children = result.slice(0, childNum);
    result = result.slice(childNum).map(x => children[x - 1] || 0);
  }
  return result.reduce((sum, x) => sum + x, 0);
}

function part1(input) {
  return metadata(input.split(' ').map(x => parseInt(x)));
}

function part2(input) {
  return metadata(input.split(' ').map(x => parseInt(x)), true);
}

module.exports = { part1, part2 };
