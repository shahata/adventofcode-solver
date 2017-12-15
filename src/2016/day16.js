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

function day(input, size) {
  const part1 = checksum(generate(input, size || 272));
  const part2 = checksum(generate(input, size || 35651584));
  return [part1, part2];
}

module.exports = {day};
