function findCommonBit(numbers, digit, mostCommon) {
  let counter = { 0: 0, 1: 0 };
  for (const num of numbers) {
    counter[num[digit]]++;
  }
  if (counter['1'] >= counter['0']) {
    return mostCommon ? '1' : '0';
  } else {
    return mostCommon ? '0' : '1';
  }
}

export function part1(input) {
  const numbers = input.split('\n');
  let mostCommon = '',
    leastCommon = '';
  for (let digit = 0; digit < numbers[0].length; digit++) {
    mostCommon += findCommonBit(numbers, digit, true);
    leastCommon += findCommonBit(numbers, digit, false);
  }
  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
}

export function part2(input) {
  let numbers = input.split('\n');
  for (let digit = 0; numbers.length > 1; digit++) {
    numbers = numbers.filter(
      num => num[digit] === findCommonBit(numbers, digit, true),
    );
  }

  let numbers2 = input.split('\n');
  for (let digit = 0; numbers2.length > 1; digit++) {
    numbers2 = numbers2.filter(
      num => num[digit] === findCommonBit(numbers2, digit, false),
    );
  }

  return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
}
