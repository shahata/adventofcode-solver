function diff(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) result++;
  }
  return result;
}

function equals(a, b, state) {
  if (state.smudges > 0) {
    const x = diff(a, b);
    if (x <= state.smudges) {
      state.smudges -= x;
      return true;
    }
  }
  return a === b;
}

function getRowMirror(patch, smudges = 0) {
  const rows = patch.map(row => row.join(''));
  for (let i = 0; i < rows.length; i++) {
    const state = { smudges };
    let mirror = false;
    if (i + 1 < rows.length && equals(rows[i], rows[i + 1], state)) {
      mirror = true;
      for (let j = 1; i - j >= 0 && i + j + 1 < rows.length; j++) {
        if (!equals(rows[i - j], rows[i + j + 1], state)) {
          mirror = false;
        }
      }
    }
    if (mirror && state.smudges === 0) {
      return i + 1;
    }
  }
  return 0;
}

function rotate(patch) {
  const result = [];
  for (let i = 0; i < patch[0].length; i++) {
    const row = patch.map(row => row[i]);
    result.push(row);
  }
  return result;
}

export function part1(input) {
  const patches = input
    .split('\n\n')
    .map(patch => patch.split('\n').map(row => row.split('')));
  let result = 0;
  for (let patch of patches) {
    const row = getRowMirror(patch);
    if (row > 0) {
      result += row * 100;
      continue;
    }
    patch = rotate(patch);
    const col = getRowMirror(patch);
    result += row * 100 + col;
  }
  return result;
}

export function part2(input) {
  const patches = input
    .split('\n\n')
    .map(patch => patch.split('\n').map(row => row.split('')));
  let result = 0;
  for (let patch of patches) {
    const row = getRowMirror(patch, 1);
    if (row > 0) {
      result += row * 100;
      continue;
    }
    patch = rotate(patch);
    const col = getRowMirror(patch, 1);
    result += col;
  }
  return result; //?
}
