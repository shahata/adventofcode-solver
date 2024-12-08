function parse(input) {
  const map = input.split("\n").map(line => line.split(""));
  const dic = new Map();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== ".") {
        const key = map[y][x];
        dic.set(key, (dic.get(key) || []).concat({ x, y }));
      }
    }
  }
  return { map, dic };
}

function pairs(dic, fn) {
  for (const points of dic.values()) {
    for (const point of points) {
      for (const other of points) {
        if (point !== other) {
          fn(point, point.x - other.x, point.y - other.y);
        }
      }
    }
  }
}
export function part1(input) {
  const { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    if (map[y - dy * 2]?.[x - dx * 2]) map[y - dy * 2][x - dx * 2] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
}

export function part2(input) {
  const { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    while (map[y - dy]?.[x - dx]) map[(y -= dy)][(x -= dx)] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
}
