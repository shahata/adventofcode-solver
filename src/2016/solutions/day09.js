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

function day(input) {
  const part1 = decodeLength(input);
  const part2 = decodeLength(input, true);
  return [part1, part2];
}

module.exports = {day};
