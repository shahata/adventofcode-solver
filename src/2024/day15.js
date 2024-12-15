function move(map, current, dir) {
  let dest = { ...current };
  if (dir === "v") dest.y++;
  if (dir === "^") dest.y--;
  if (dir === ">") dest.x++;
  if (dir === "<") dest.x--;

  if (map[dest.y][dest.x] === "O") move(map, dest, dir);
  if (map[dest.y][dest.x] === "[" || map[dest.y][dest.x] === "]") {
    if (dest.x !== current.x) move(map, dest, dir);
    else {
      let copy = map.map(row => [...row]);
      let pair = { ...dest };
      pair.x += map[dest.y][dest.x] === "[" ? 1 : -1;
      if (move(copy, dest, dir) !== dest && move(copy, pair, dir) !== pair) {
        move(map, dest, dir);
        move(map, pair, dir);
      }
    }
  }
  if (map[dest.y][dest.x] === ".") {
    map[dest.y][dest.x] = map[current.y][current.x];
    map[current.y][current.x] = ".";
    return dest;
  }
  return current;
}

function checksum(map) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O" || map[y][x] === "[") sum += 100 * y + x;
    }
  }
  return sum;
}

function parse(input) {
  let [map, moves] = input.split("\n\n");
  map = map.split("\n").map(row => row.split(""));
  moves = moves.split("").filter(x => x !== "\n");
  let y = map.findIndex(row => row.includes("@"));
  let x = map[y].findIndex(cell => cell === "@");
  let current = { x, y };
  return { map, moves, current };
}

export function part1(input) {
  let { map, moves, current } = parse(input);
  moves.reduce((current, next) => move(map, current, next), current);
  return checksum(map);
}

export function part2(input) {
  input = input
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.");
  return part1(input);
}
