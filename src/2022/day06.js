export function part1(input, len = 4) {
  for (let i = 0; i < input.length; i++) {
    const slice = input.slice(i, i + len);
    if (new Set(slice.split("")).size === len) {
      return i + len;
    }
  }
}

export function part2(input) {
  return part1(input, 14);
}
