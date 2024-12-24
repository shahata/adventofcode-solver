export function part1(input) {
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

  let [, row, col] = input.match(/row (\d+), column (\d+).$/).map(Number);
  return calcPosition(calcIndex(row, col));
}

export function part2() {
  return undefined;
}
