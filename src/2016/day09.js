function decodeLength(s, v2) {
  const [, prefix, lengthStr, timesStr, rest] = s.match(
    /^([^(]*)(?:\((\d+)x(\d+)\))?(.*)$/,
  );
  if (lengthStr) {
    const length = parseInt(lengthStr);
    const times = parseInt(timesStr);
    const repeat =
      times * (v2 ? decodeLength(rest.slice(0, length), v2) : length);
    return prefix.length + repeat + decodeLength(rest.slice(length), v2);
  } else {
    return prefix.length;
  }
}

export const part1 = input => decodeLength(input);
export const part2 = input => decodeLength(input, true);
