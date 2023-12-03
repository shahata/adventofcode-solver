function signed(map, i, j, check = c => c && c !== '.' && Number.isNaN(+c)) {
  return [
    { pos: `${i - 1},${j - 1}`, c: map[i - 1]?.[j - 1] },
    { pos: `${i - 1},${j}`, c: map[i - 1]?.[j] },
    { pos: `${i - 1},${j + 1}`, c: map[i - 1]?.[j + 1] },
    { pos: `${i},${j - 1}`, c: map[i]?.[j - 1] },
    { pos: `${i},${j + 1}`, c: map[i]?.[j + 1] },
    { pos: `${i + 1},${j - 1}`, c: map[i + 1]?.[j - 1] },
    { pos: `${i + 1},${j}`, c: map[i + 1]?.[j] },
    { pos: `${i + 1},${j + 1}`, c: map[i + 1]?.[j + 1] },
  ].find(({ c }) => check(c))?.pos;
}

function parse(input, check) {
  const map = input.split('\n').map(line => line.split(''));
  const signs = {};
  for (let i = 0; i < map.length; i++) {
    let current = '';
    let pos = undefined;
    for (let j = 0; j < map[i].length; j++) {
      if (Number.isInteger(+map[i][j])) {
        current += map[i][j];
        pos = pos || signed(map, i, j, check);
      } else {
        if (pos) signs[pos] = (signs[pos] || []).concat(+current);
        current = '';
        pos = undefined;
      }
    }
    if (pos) signs[pos] = (signs[pos] || []).concat(+current);
  }
  return signs;
}

export function part1(input) {
  return Object.values(parse(input))
    .flat()
    .reduce((a, b) => a + b, 0);
}

export function part2(input) {
  return Object.values(parse(input, c => c === '*'))
    .map(gear => (gear.length > 1 ? gear.reduce((a, b) => a * b, 1) : 0))
    .reduce((a, b) => a + b, 0);
}
