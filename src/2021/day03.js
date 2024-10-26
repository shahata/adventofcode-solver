function findMostCommonBit(numbers, digit) {
  const counter = numbers.filter(number => number[digit] === "1").length;
  return counter >= numbers.length / 2 ? "1" : "0";
}

export function part1(input) {
  const numbers = input.split("\n");
  const mask = parseInt("1".repeat(numbers[0].length), 2);
  let mostCommon = "";
  for (let digit = 0; digit < numbers[0].length; digit++) {
    mostCommon += findMostCommonBit(numbers, digit);
  }
  return parseInt(mostCommon, 2) * (parseInt(mostCommon, 2) ^ mask);
}

export function part2(input) {
  let numbers = input.split("\n");
  let numbers2 = input.split("\n");
  for (let digit = 0; numbers.length > 1; digit++) {
    const bit = findMostCommonBit(numbers, digit);
    numbers = numbers.filter(number => number[digit] === bit);
  }
  for (let digit = 0; numbers2.length > 1; digit++) {
    const bit = findMostCommonBit(numbers2, digit);
    numbers2 = numbers2.filter(number => number[digit] !== bit);
  }
  return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
}
