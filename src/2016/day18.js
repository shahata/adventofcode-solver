function calcRow(row) {
  return row
    .split("")
    .map((x, i) => {
      const [l, c, r] = [row[i - 1] || ".", row[i], row[i + 1] || "."];
      return (l !== c && l !== r) || (r !== c && r !== l) ? "^" : ".";
    })
    .join("");
}

function solve(input, rows) {
  let row,
    count = 0;
  for (let i = 0; i < rows; i++) {
    row = i === 0 ? input : calcRow(row);
    count += row.match(/\./g).length;
  }
  return count;
}

export function part1(input, rows = 40) {
  return solve(input, rows);
}

export function part2(input, rows = 4e5) {
  return solve(input, rows);
}
