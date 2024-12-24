function parse(input) {
  let map = input.split("\n").map(line => line.split(""));
  let dic = new Map();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== ".") {
        let key = map[y][x];
        dic.set(key, (dic.get(key) || []).concat({ x, y }));
      }
    }
  }
  return { map, dic };
}

function pairs(dic, fn) {
  for (let points of dic.values()) {
    for (let point of points) {
      for (let other of points) {
        if (point !== other) {
          fn(point, point.x - other.x, point.y - other.y);
        }
      }
    }
  }
}
export function part1(input) {
  let { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    if (map[y - dy * 2]?.[x - dx * 2]) map[y - dy * 2][x - dx * 2] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
}

export function part2(input) {
  let { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    while (map[y - dy]?.[x - dx]) map[(y -= dy)][(x -= dx)] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
}
