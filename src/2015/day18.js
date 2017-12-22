function life(grid, stuck) {
  function calc(state, i, j) {
    const safe = (idiff, jdiff) => grid[i + idiff] && grid[i + idiff][j + jdiff];
    const adjacent = [safe(-1, -1), safe(-1, 0), safe(-1, 1), safe(0, -1), safe(0, 1),
      safe(1, -1), safe(1, 0), safe(1, 1)].filter(x => x).length;
    switch (adjacent) {
      case 3: return true;
      case 2: return state;
      default: return false;
    }
  }
  return grid.map((row, i) => row.map((cell, j) => stuck(i, j) || calc(cell, i, j)));
}

function part1(input, steps = 100) {
  const grid1 = input.split('\n').map(x => x.split('').map(c => c === '#'));
  const result = new Array(steps).fill(undefined).reduce(x => life(x, () => false), grid1);
  return result.reduce((prev, row) => prev.concat(row)).filter(x => x).length;
}

function part2(input, steps = 100) {
  const grid1 = input.split('\n').map(x => x.split('').map(c => c === '#'));
  const corner = (i, j) => (i === 0 || i === grid1.length - 1) && (j === 0 || j === grid1.length - 1);
  const grid2 = grid1.map((row, i) => row.map((cell, j) => cell || corner(i, j)));
  const result = new Array(steps).fill(undefined).reduce(x => life(x, corner), grid2);
  return result.reduce((prev, row) => prev.concat(row)).filter(x => x).length;
}

module.exports = {part1, part2};
