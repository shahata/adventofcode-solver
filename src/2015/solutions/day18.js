function day(input) {
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

  const grid1 = input.split('\n').map(x => x.split('').map(c => c === '#'));
  let part1 = new Array(100).fill(undefined).reduce(x => life(x, () => false), grid1);
  part1 = part1.reduce((prev, row) => prev.concat(row)).filter(x => x).length;

  const corner = (i, j) => (i === 0 || i === 99) && (j === 0 || j === 99);
  const grid2 = grid1.map((row, i) => row.map((cell, j) => cell || corner(i, j)));
  let part2 = new Array(100).fill(undefined).reduce(x => life(x, corner), grid2);
  part2 = part2.reduce((prev, row) => prev.concat(row)).filter(x => x).length;

  return [part1, part2];
}

module.exports = {day};
