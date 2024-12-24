export function part1(input, len = 2) {
  let steps = input.split("\n").map(line => line.split(" "));
  let knots = new Array(len).fill().map(() => ({ x: 0, y: 0 }));
  let visited = new Set([`0,0`]);
  for (let [direction, count] of steps) {
    for (let i = 0; i < +count; i++) {
      if (direction === "R") knots[0].x++;
      if (direction === "L") knots[0].x--;
      if (direction === "D") knots[0].y++;
      if (direction === "U") knots[0].y--;
      for (let j = 1; j < knots.length; j++) {
        let [H, T] = [knots[j - 1], knots[j]];
        if (Math.abs(H.x - T.x) === 2 || Math.abs(H.y - T.y) === 2) {
          T.x = H.x === T.x ? T.x : H.x > T.x ? T.x + 1 : T.x - 1;
          T.y = H.y === T.y ? T.y : H.y > T.y ? T.y + 1 : T.y - 1;
        }
      }
      visited.add(`${knots[len - 1].x},${knots[len - 1].y}`);
    }
  }
  return visited.size;
}

export function part2(input) {
  return part1(input, 10);
}
