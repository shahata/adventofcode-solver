export function part1(input) {
  return input
    .split("\n\n")
    .map(x => new Set(x.replace(/\n/g, "").split("")).size)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split("\n\n")
    .map(x => {
      let merged = x.replace(/\n/g, "").split("").sort().join("");
      let count = x.split("\n").length;
      return merged.match(new RegExp(`(.)\\1{${count - 1}}`, "g"))?.length || 0;
    })
    .reduce((a, b) => a + b);
}
