function life(grid, stuck) {
  function calc(state, i, j) {
    let adjacent = [
      grid[i - 1] && grid[i - 1][j - 1],
      grid[i - 1] && grid[i - 1][j + 0],
      grid[i - 1] && grid[i - 1][j + 1],
      grid[i + 0] && grid[i + 0][j - 1],
      grid[i + 0] && grid[i + 0][j + 1],
      grid[i + 1] && grid[i + 1][j - 1],
      grid[i + 1] && grid[i + 1][j + 0],
      grid[i + 1] && grid[i + 1][j + 1],
    ].filter(x => x).length;
    if (adjacent === 3) {
      return true;
    } else if (adjacent === 2) {
      return state;
    } else {
      return false;
    }
  }
  return grid.map((row, i) =>
    row.map((cell, j) => (stuck && stuck(i, j)) || calc(cell, i, j)),
  );
}

export function part1(input, steps = 100) {
  let grid1 = input.split('\n').map(x => x.split('').map(c => c === '#'));
  let result = new Array(steps).fill().reduce(x => life(x), grid1);
  return result.reduce((prev, row) => prev.concat(row)).filter(x => x).length;
}

export function part2(input, steps = 100) {
  let grid1 = input.split('\n').map(x => x.split('').map(c => c === '#'));
  let corner = (i, j) =>
    (i === 0 || i === grid1.length - 1) && (j === 0 || j === grid1.length - 1);
  let grid2 = grid1.map((row, i) => row.map((cell, j) => cell || corner(i, j)));
  let result = new Array(steps).fill().reduce(x => life(x, corner), grid2);
  return result.reduce((prev, row) => prev.concat(row)).filter(x => x).length;
}
