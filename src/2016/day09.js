function decodeLength(s, v2) {
  let [, prefix, length, times, rest] = s.match(/^([^(]*)(?:\((\d+)x(\d+)\))?(.*)$/);
  if (length) {
    length = parseInt(length);
    times = parseInt(times);
    const repeat = times * (v2 ? decodeLength(rest.slice(0, length), v2) : length);
    return prefix.length + repeat + decodeLength(rest.slice(length), v2);
  } else {
    return prefix.length;
  }
}

const part1 = input => decodeLength(input);
const part2 = input => decodeLength(input, true);

module.exports = {part1, part2};
