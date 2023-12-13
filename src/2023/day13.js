function equals(a, b, state) {
  const x = a.split('').filter((x, i) => x !== b[i]).length;
  if (x <= state.smudges) {
    state.smudges -= x;
    return true;
  }
}

function isMirror(rows, i, smudges) {
  const state = { smudges };
  if (i + 1 >= rows.length) return false;
  for (let j = 0; i - j >= 0 && i + j + 1 < rows.length; j++) {
    if (!equals(rows[i - j], rows[i + j + 1], state)) return false;
  }
  return state.smudges === 0;
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
  for (let patch of patches) {
    const row = getRowMirror(patch, smudges);
    if (row) result += row * 100;
    else result += getRowMirror(rotate(patch), smudges);
  }
  return result;
}

export function part2(input) {
  return part1(input, 1);
}
