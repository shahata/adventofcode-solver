function countRoles(map, clear = false) {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      let count = [
        map[i - 1]?.[j - 1],
        map[i - 1]?.[j],
        map[i - 1]?.[j + 1],
        map[i]?.[j - 1],
        map[i]?.[j + 1],
        map[i + 1]?.[j - 1],
        map[i + 1]?.[j],
        map[i + 1]?.[j + 1],
      ].filter(x => x === "@").length;
      if (count < 4 && map[i][j] === "@") {
        if (clear) map[i][j] = ".";
        result++;
      }
    }
  }
  return result;
}

export function part1(input) {
  let map = input.split("\n").map(x => x.split(""));
  return countRoles(map);
}

export function part2(input) {
  let result;
  let sum = 0;
  let map = input.split("\n").map(x => x.split(""));
  while (result !== 0) {
    result = countRoles(map, true);
    sum += result;
  }
  return sum;
}
