'use strict';

export function day25(input) {
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
    for (var x = 20151125; n > 1; n--) {
      x = (x * 252533) % 33554393;
    }
    return x;
  }

  let [row, col] = input.match(/row (\d+), column (\d+).$/).slice(1).map(x => parseInt(x, 10));
  let part1 = calcPosition(calcIndex(row, col));
  return [part1, undefined];
}
