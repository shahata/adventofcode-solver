import { ocr } from '../utils/ocr.js';

function fold(input, total = Infinity) {
  let [paper, folds] = input.split('\n\n');
  paper = paper.split('\n').map(line => line.split(',').map(Number));
  folds = folds.split('\n').map(line => {
    const [axis, number] = line.replace('fold along ', '').split('=');
    return { axis, number: +number };
  });
  const maxX = Math.max(...paper.map(l => l[0])) + 1;
  const maxY = Math.max(...paper.map(l => l[1])) + 1;
  let board = new Array(maxY).fill().map(() => new Array(maxX).fill('.'));
  paper.forEach(([x, y]) => (board[y][x] = '#'));
  for (let i = 0; i < total && i < folds.length; i++) {
    if (folds[i].axis === 'x') {
      const rest = board.map(line => line.slice(folds[i].number + 1));
      board = board.map(line => line.slice(0, folds[i].number));
      rest.forEach((line, y) =>
        line.forEach((value, x) => {
          if (value === '#') board[y][folds[i].number - x - 1] = value;
        }),
      );
    } else if (folds[i].axis === 'y') {
      const rest = board.slice(folds[i].number + 1);
      board = board.slice(0, folds[i].number);
      rest.forEach((line, y) =>
        line.forEach((value, x) => {
          if (value === '#') board[folds[i].number - y - 1][x] = value;
        }),
      );
    }
  }
  return board;
}

export function part1(input) {
  const paper = fold(input, 1);
  let count = 0;
  paper.forEach(line => line.forEach(value => value === '#' && count++));
  return count;
}

export function part2(input) {
  const paper = fold(input);
  return ocr(paper.map(line => '.' + line.join('')).join('\n'));
}
