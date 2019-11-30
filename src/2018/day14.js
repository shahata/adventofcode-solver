function cook(check) {
  let [elf1, elf2] = [0, 1];
  const board = [3, 7, 1, 0];
  while (check(board)) {
    elf1 = (elf1 + board[elf1] + 1) % board.length;
    elf2 = (elf2 + board[elf2] + 1) % board.length;
    const newRecipes = String(board[elf1] + board[elf2]).split('');
    board.push(...newRecipes.map(x => parseInt(x)));
  }
  return board;
}

export function part1(input) {
  const count = parseInt(input);
  const board = cook(board => board.length < count + 10);
  return board.slice(count, count + 10).join('');
}

export function part2(input) {
  let suffix = '';
  const board = cook(board => {
    suffix = board.slice(-1 * input.length - 1).join('');
    return !suffix.includes(input);
  });
  return board.length - input.length + suffix.indexOf(input) - 1;
}
