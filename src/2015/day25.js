function part1(input) {
  function calcIndex(row, column) {
    let index = 0;
    for (let i = 1; i <= column; i++) {
      index += i;
    }
    for (let j = 1; j <= row - 1; j++) {
      index += j + column - 1;
    }
    return index;
  }

  function calcPosition(n) {
    let x = 20151125;
    for (; n > 1; n--) {
      x = (x * 252533) % 33554393;
    }
    return x;
  }

  const [row, col] = input.match(/row (\d+), column (\d+).$/).slice(1).map(x => parseInt(x, 10));
  return calcPosition(calcIndex(row, col));
}

module.exports = {part1, part2: () => undefined};
