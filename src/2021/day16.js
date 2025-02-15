let readRaw = (input, length) => input.splice(0, length);
let toNumber = number => parseInt(number.join(""), 2);
let readNumber = (input, length) => toNumber(readRaw(input, length));

function calculate(input, sumOfVersions = false) {
  let version = readNumber(input, 3);
  let typeId = readNumber(input, 3);
  if (typeId === 4) {
    let haveMore = 1;
    let number = [];
    while (haveMore === 1) {
      haveMore = readNumber(input, 1);
      number = number.concat(readRaw(input, 4));
    }
    return sumOfVersions ? version : toNumber(number);
  } else {
    let lengthTypeId = readNumber(input, 1);
    let subPackets = [];
    if (lengthTypeId === 1) {
      let numberOfPackets = readNumber(input, 11);
      for (let i = 0; i < numberOfPackets; i++) {
        subPackets.push(calculate(input, sumOfVersions));
      }
    } else {
      let lengthOfPackets = readNumber(input, 15);
      let targetLength = input.length - lengthOfPackets;
      while (input.length !== targetLength) {
        subPackets.push(calculate(input, sumOfVersions));
      }
    }
    if (sumOfVersions) return version + subPackets.reduce((a, b) => a + b, 0);
    switch (typeId) {
      case 0:
        return subPackets.reduce((a, b) => a + b, 0);
      case 1:
        return subPackets.reduce((a, b) => a * b, 1);
      case 2:
        return Math.min(...subPackets);
      case 3:
        return Math.max(...subPackets);
      case 5:
        return subPackets[0] > subPackets[1] ? 1 : 0;
      case 6:
        return subPackets[0] < subPackets[1] ? 1 : 0;
      case 7:
        return subPackets[0] === subPackets[1] ? 1 : 0;
    }
  }
}

export function part1(input) {
  input = input
    .split("")
    .map(n => parseInt(n, 16).toString(2).padStart(4, "0").split(""))
    .flat();
  return calculate(input, true);
}

export function part2(input) {
  input = input
    .split("")
    .map(n => parseInt(n, 16).toString(2).padStart(4, "0").split(""))
    .flat();
  return calculate(input);
}
