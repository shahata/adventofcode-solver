function generate(input, size) {
  input = input.split('');
  while (input.length < size) {
    input = dragonCurve(input);
  }
  return input.slice(0, size).join('');
}

function dragonCurve(a) {
  const b = a.map(x => x === '0' ? '1' : '0').reverse();
  return a.concat('0', b);
}

function checksum(data) {
  while (data.length % 2 === 0) {
    data = data.replace(/../g, x => x === '00' || x === '11' ? '1' : '0');
  }
  return data;
}

const part1 = (input, size = 272) => checksum(generate(input, size));
const part2 = (input, size = 35651584) => checksum(generate(input, size));

module.exports = {part1, part2};
