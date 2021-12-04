function mark(board, number) {
  board.forEach(row =>
    row.forEach(slot => slot.number === number && (slot.marked = true)),
  );
}

function winner(board) {
  const winnerRow = board.some(row => row.every(slot => slot.marked));
  const winnerCol = board[0].some((s, i) => board.every(row => row[i].marked));
  return winnerRow || winnerCol;
}

function calc(board) {
  let sum = 0;
  board.forEach(row =>
    row.forEach(slot => !slot.marked && (sum += slot.number)),
  );
  return sum;
}

export function part1(input, win = true) {
  let [numbers, ...boards] = input.split('\n\n');
  numbers = numbers.split(',').map(n => +n);
  boards = boards.map(board =>
    board.split('\n').map(row =>
      row
        .trim()
        .split(/\s+/)
        .map(n => ({ marked: false, number: +n })),
    ),
  );
  for (const number of numbers) {
    for (const board of boards) {
      mark(board, number);
      if (winner(board)) {
        if (win || boards.length === 1) {
          return number * calc(board);
        } else {
          boards = boards.filter(b => b !== board);
        }
      }
    }
  }
}

export function part2(input) {
  return part1(input, false);
}
