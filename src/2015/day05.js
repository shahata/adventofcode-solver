export function part1(input) {
  return input
    .split("\n")
    .filter(x => (x.match(/[aeiou]/g) || []).length >= 3)
    .filter(x => x.match(/([a-z])\1/))
    .filter(x => !x.match(/ab|cd|pq|xy/)).length;
}

export function part2(input) {
  return input
    .split("\n")
    .filter(x => x.match(/([a-z][a-z]).*\1/))
    .filter(x => x.match(/([a-z]).\1/)).length;
}
