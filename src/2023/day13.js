function isMirror(rows, i, smudges) {
  if (i + 1 >= rows.length) return false;
  for (let j = 0; i - j >= 0 && i + j + 1 < rows.length; j++) {
    const x = rows[i - j].split('').filter((x, k) => x !== rows[i + j + 1][k]);
    if (x.length > smudges) return false;
    else smudges -= x.length;
  }
  return smudges === 0;
}

function getRowMirror(rows, smudges) {
  return rows.findIndex((row, i) => isMirror(rows, i, smudges)) + 1;
}

function rotate(patch) {
  const result = new Array(patch[0].length).fill();
  return result.map((x, i) => patch.map(row => row[i]).join(''));
}

export function part1(input, smudges = 0) {
  const patches = input.split('\n\n').map(patch => patch.split('\n'));
  let result = 0;
  for (const patch of patches) {
    const row = getRowMirror(patch, smudges);
    if (row) result += row * 100;
    else result += getRowMirror(rotate(patch), smudges);
  }
  return result;
}

export function part2(input) {
  return part1(input, 1);
}
