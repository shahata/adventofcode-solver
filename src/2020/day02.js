export function part1(input) {
  let result = input.split("\n").filter(x => {
    let [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    let count = password.split("").filter(x => x === character).length;
    return count >= +start && count <= +end;
  }).length;
  return result;
}

export function part2(input) {
  let result = input.split("\n").filter(x => {
    let [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    let a = password[start - 1] === character ? 1 : 0;
    let b = password[end - 1] === character ? 1 : 0;
    return a + b === 1;
  }).length;
  return result;
}
