const directions = {
  D: { y: 1, x: 0 },
  R: { y: 0, x: 1 },
  U: { y: -1, x: 0 },
  L: { y: 0, x: -1 },
};

function move(keypad, position, step) {
  const next = { x: position.x + step.x, y: position.y + step.y };
  return keypad[next.y] && keypad[next.y][next.x] ? next : position;
}

function solve(input, keypad, start) {
  return input
    .split('\n')
    .map(line => line.split(''))
    .reduce((code, line) => {
      return code.concat(
        line.reduce(
          (position, step) => {
            return move(keypad, position, directions[step]);
          },
          code.at(-1) || start,
        ),
      );
    }, [])
    .map(key => keypad[key.y][key.x])
    .join('');
}

const keypad1 = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export function part1(input) {
  return solve(input, keypad1, { x: 1, y: 1 });
}

const keypad2 = [
  [NaN, NaN, '1', NaN, NaN],
  [NaN, '2', '3', '4', NaN],
  ['5', '6', '7', '8', '9'],
  [NaN, 'A', 'B', 'C', NaN],
  [NaN, NaN, 'D', NaN, NaN],
];

export function part2(input) {
  return solve(input, keypad2, { x: 0, y: 2 });
}
