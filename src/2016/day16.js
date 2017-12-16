function generate(input, size) {
  while (input.length < size) {
    input = dragonCurve(input);
  }
  return input.slice(0, size);
}

function dragonCurve(a) {
  const b = a.split('').reverse().map(x => x === '0' ? '1' : '0').join('');
  return `${a}0${b}`;
}

function checksum(data) {
  const result = data.match(/../g).map(x => x === '00' || x === '11' ? '1' : '0').join('');
  if (result.length % 2 === 0) {
    return checksum(result);
  } else {
    return result;
  }
}

const part1 = (input, size = 272) => checksum(generate(input, size));
const part2 = (input, size = 35651584) => checksum(generate(input, size));
const day = input => [part1(input), part2(input)];

module.exports = {day, part1, part2};
