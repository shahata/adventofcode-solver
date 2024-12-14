export function part1(input, w = 101, h = 103) {
  const robots = input.split("\n").map(line => {
    const [, px, py, vx, vy] = line.match(/p=(.+),(.+) v=(.+),(.+)/);
    return { px: +px, py: +py, vx: +vx, vy: +vy };
  });
  for (let i = 1; i <= 100; i++) {
    robots.forEach(robot => {
      robot.px = (w + robot.px + robot.vx) % w;
      robot.py = (h + robot.py + robot.vy) % h;
    });
  }
  let q = [0, 0, 0, 0];
  let h2 = (h - 1) / 2;
  let w2 = (w - 1) / 2;
  robots.forEach(robot => {
    if (robot.px < w2 && robot.py < h2) q[0]++;
    if (robot.px > w2 && robot.py < h2) q[1]++;
    if (robot.px < w2 && robot.py > h2) q[2]++;
    if (robot.px > w2 && robot.py > h2) q[3]++;
  });
  return q.reduce((a, b) => a * b, 1);
}

const tree = [
  "###############################",
  "#.............................#",
  "#.............................#",
  "#.............................#",
  "#.............................#",
  "#..............#..............#",
  "#.............###.............#",
  "#............#####............#",
  "#...........#######...........#",
  "#..........#########..........#",
  "#............#####............#",
  "#...........#######...........#",
  "#..........#########..........#",
  "#.........###########.........#",
  "#........#############........#",
  "#..........#########..........#",
  "#.........###########.........#",
  "#........#############........#",
  "#.......###############.......#",
  "#......#################......#",
  "#........#############........#",
  "#.......###############.......#",
  "#......#################......#",
  "#.....###################.....#",
  "#....#####################....#",
  "#.............###.............#",
  "#.............###.............#",
  "#.............###.............#",
  "#.............................#",
  "#.............................#",
  "#.............................#",
  "#.............................#",
  "###############################",
];

export function part2(input, w = 101, h = 103) {
  const robots = input.split("\n").map(line => {
    const [, px, py, vx, vy] = line.match(/p=(.+),(.+) v=(.+),(.+)/);
    return { px: +px, py: +py, vx: +vx, vy: +vy };
  });
  for (let i = 1; i < Infinity; i++) {
    let map = new Array(h).fill().map(() => new Array(w).fill("."));
    robots.forEach(robot => {
      robot.px = (w + robot.px + robot.vx) % w;
      robot.py = (h + robot.py + robot.vy) % h;
      map[robot.py][robot.px] = "#";
    });
    let match = 0;
    for (let y = 0; y < h - tree.length; y++) {
      if (map[y].join("").includes(tree[match])) {
        match++;
        if (match === tree.length) return i;
      } else if (match > 0) {
        match = 0;
        y--;
      }
    }
  }
}
