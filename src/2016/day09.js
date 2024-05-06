function decodeLength(s, v2) {
  let [, prefix, lengthStr, timesStr, rest] = s.match(
    /^([^(]*)(?:\((\d+)x(\d+)\))?(.*)$/,
  );
  if (lengthStr) {
    let length = +lengthStr;
    let times = +timesStr;
    let repeat =
      times * (v2 ? decodeLength(rest.slice(0, length), v2) : length);
    return prefix.length + repeat + decodeLength(rest.slice(length), v2);
  } else {
    return prefix.length;
  }
}

export function part1(input) {
  return decodeLength(input);
}

export function part2(input) {
  return decodeLength(input, true);
}
