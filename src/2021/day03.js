function findMostCommonBit(numbers, digit) {
  const counter = { 0: 0, 1: 0 };
  numbers.forEach(number => counter[number[digit]]++);
  return counter['1'] >= counter['0'] ? '1' : '0';
}

export function part1(input) {
  const numbers = input.split('\n');
  let mostCommon = '';
  let leastCommon = '';
  for (let digit = 0; digit < numbers[0].length; digit++) {
    const bit = findMostCommonBit(numbers, digit);
    mostCommon += bit;
    leastCommon += bit === '1' ? '0' : '1';
  }
  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
}

export function part2(input) {
  let numbers = input.split('\n');
  let numbers2 = input.split('\n');
  for (let digit = 0; numbers.length > 1; digit++) {
    numbers = numbers.filter(
      number => number[digit] === findMostCommonBit(numbers, digit),
    );
  }
  for (let digit = 0; numbers2.length > 1; digit++) {
    numbers2 = numbers2.filter(
      number => number[digit] !== findMostCommonBit(numbers2, digit),
    );
  }
  return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
}
