import { execute } from "./day09.js";

export function part1(input) {
  let output = [];
  let user = { input: [], output: x => output.push(x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return output.filter((x, i) => i % 3 === 2).filter(x => x === 2).length;
}

export function part2(input) {
  let output = [];
  let board = [];
  let score = 0;

  function move() {
    while (output.length) {
      let [x, y, id] = output.splice(0, 3);
      if (x === -1 && y === 0) {
        score = id;
      } else {
        board[y] = board[y] || [];
        board[y][x] = id;
      }
    }
    let paddle = Math.max(...board.map(row => row.indexOf(3)));
    let ball = Math.max(...board.map(row => row.indexOf(4)));
    return (ball - paddle) / Math.abs(ball - paddle);
  }

  let user = { input: move, output: x => output.push(x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;
  ops[0] = 2;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  move();

  return score;
}
