let dic = {
  "|": ["UP", "DOWN"],
  "-": ["LEFT", "RIGHT"],
  "L": ["UP", "RIGHT"],
  "J": ["UP", "LEFT"],
  "7": ["DOWN", "LEFT"],
  "F": ["DOWN", "RIGHT"],
};

function start(map, { UP, DOWN, LEFT, RIGHT }) {
  let S = [];
  if ("|7F".includes(map[UP.y]?.[UP.x])) S.push("UP");
  if ("|LJ".includes(map[DOWN.y]?.[DOWN.x])) S.push("DOWN");
  if ("-LF".includes(map[LEFT.y]?.[LEFT.x])) S.push("LEFT");
  if ("-J7".includes(map[RIGHT.y]?.[RIGHT.x])) S.push("RIGHT");
  return Object.keys(dic).find(key => dic[key].join("_") === S.join("_"));
}

function solve(input) {
  let map = input.split("\n").map(line => line.split(""));
  let y = map.findIndex(line => line.includes("S"));
  let x = map[y].findIndex(c => c === "S");
  let queue = [{ x, y, steps: 0 }];
  let visited = new Set([`${x},${y}`]);
  let max = 0;
  while (queue.length > 0) {
    let current = queue.shift();
    let neighbors = {
      UP: { x: current.x, y: current.y - 1, steps: current.steps + 1 },
      DOWN: { x: current.x, y: current.y + 1, steps: current.steps + 1 },
      LEFT: { x: current.x - 1, y: current.y, steps: current.steps + 1 },
      RIGHT: { x: current.x + 1, y: current.y, steps: current.steps + 1 },
    };
    if (map[current.y][current.x] === "S") {
      map[current.y][current.x] = start(map, neighbors);
    }
    let next = dic[map[current.y][current.x]].map(dir => neighbors[dir]);
    next = next.filter(({ x, y }) => !visited.has(`${x},${y}`));
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    max = Math.max(max, current.steps);
    queue.push(...next);
  }
  return { max, map, visited };
}

function zoomin(map) {
  let big = [];
  for (let yi = 0; yi < map.length; yi++) {
    let line1 = [];
    let line2 = [];
    let line3 = [];
    for (let xi = 0; xi < map[yi].length; xi++) {
      let [UP, DOWN, LEFT, RIGHT] = ["UP", "DOWN", "LEFT", "RIGHT"].map(x =>
        (dic[map[yi][xi]] || []).includes(x) ? "#" : ".",
      );
      line1.push(".", UP, ".");
      line2.push(LEFT, map[yi][xi], RIGHT);
      line3.push(".", DOWN, ".");
    }
    big.push(line1, line2, line3);
  }
  return big;
}

function zoomout(map) {
  let small = [];
  for (let y = 0; y < map.length; y += 3) {
    let line = [];
    for (let x = 0; x < map[y].length; x += 3) line.push(map[y + 1][x + 1]);
    small.push(line);
  }
  return small;
}

function flood(map, x, y) {
  let visited = new Set([`${x},${y}`]);
  let queue = [{ x, y }];
  let trapped = true;
  while (queue.length > 0) {
    let current = queue.shift();
    let neighbors = [
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
    ];
    let next = neighbors.filter(({ x, y }) => {
      if (!map[y] || !map[y][x]) trapped = false;
      return map[y]?.[x] === "." && !visited.has(`${x},${y}`);
    });
    next.forEach(({ x, y }) => visited.add(`${x},${y}`));
    queue.push(...next);
  }
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(`${x},${y}`)) map[y][x] = trapped ? "I" : "O";
    }
  }
}

export function part1(input) {
  let { max } = solve(input);
  return max;
}

export function part2(input) {
  let { map, visited } = solve(input);
  map = map.map((line, y) => {
    return line.map((c, x) => (visited.has(`${x},${y}`) ? c : "."));
  });
  let big = zoomin(map);
  for (let y = 0; y < big.length; y++) {
    for (let x = 0; x < big[y].length; x++) {
      if (big[y][x] === ".") flood(big, x, y);
    }
  }
  let small = zoomout(big);
  return small.flat().filter(c => c === "I").length;
}
