function parse(input, floor) {
  let max = { x: 0, y: 0 };
  let rocks = input.split("\n").map(rock =>
    rock.split(" -> ").map(line => {
      let [x, y] = line.split(",").map(n => +n);
      if (x > max.x) max.x = x;
      if (y > max.y) max.y = y;
      return { x, y };
    }),
  );
  let cave = new Array(max.y * 2)
    .fill()
    .map(() => new Array(max.x * 2).fill("."));
  for (let rock of rocks) {
    for (let i = 0; i < rock.length - 1; i++) {
      if (rock[i].x === rock[i + 1].x) {
        let from = Math.min(rock[i].y, rock[i + 1].y);
        let to = Math.max(rock[i].y, rock[i + 1].y);
        for (let y = from; y <= to; y++) cave[y][rock[i].x] = "#";
      } else {
        let from = Math.min(rock[i].x, rock[i + 1].x);
        let to = Math.max(rock[i].x, rock[i + 1].x);
        for (let x = from; x <= to; x++) cave[rock[i].y][x] = "#";
      }
    }
  }
  if (floor) cave[max.y + 2].fill("#");
  return cave;
}

function drip(cave) {
  let count = 0;
  let resting = true;
  while (cave[0][500] === "." && resting) {
    let sand = { x: 500, y: 0 };
    resting = false;
    while (cave[sand.y + 1] && !resting) {
      if (cave[sand.y + 1][sand.x] === ".") {
        sand.y++;
      } else if (cave[sand.y + 1][sand.x - 1] === ".") {
        sand.y++;
        sand.x--;
      } else if (cave[sand.y + 1][sand.x + 1] === ".") {
        sand.y++;
        sand.x++;
      } else {
        cave[sand.y][sand.x] = "o";
        resting = true;
        count++;
      }
    }
  }
  return count;
}

export function part1(input) {
  let cave = parse(input, false);
  return drip(cave);
}

export function part2(input) {
  let cave = parse(input, true);
  return drip(cave);
}
