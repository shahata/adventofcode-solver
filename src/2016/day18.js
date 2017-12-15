function calcRow(row) {
  return row.split('').map((x, i) => {
    const [l, c, r] = [row[i - 1] || '.', row[i], row[i + 1] || '.'];
    return (l !== c && l !== r) || (r !== c && r !== l) ? '^' : '.';
  }).join('');
}

function solve(input, rows) {
  let row, count = 0;
  for (let i = 0; i < rows; i++) {
    row = i === 0 ? input : calcRow(row);
    count += row.match(/\./g).length;
  }
  return count;
}

function day(input, rows) {
  const part1 = solve(input, rows || 40);
  const part2 = solve(input, rows || 400000);
  return [part1, part2];
}

module.exports = {day};
