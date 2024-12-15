function move(map, current, direction) {
  let dest = { ...current };
  if (direction === "v") dest.y++;
  else if (direction === "^") dest.y--;
  else if (direction === "<") dest.x--;
  else if (direction === ">") dest.x++;

  if (map[dest.y][dest.x] === "O") move(map, dest, direction);
  if (map[dest.y][dest.x] === "[" || map[dest.y][dest.x] === "]") {
    if (dest.x !== current.x) move(map, dest, direction);
    else {
      let copy = map.map(row => row.slice(0));
      let pair = { ...dest };
      pair.x += map[dest.y][dest.x] === "[" ? 1 : -1;
      if (
        move(copy, dest, direction) !== dest &&
        move(copy, pair, direction) !== pair
      ) {
        move(map, dest, direction);
        move(map, pair, direction);
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
  moves.reduce((current, x) => move(map, current, x), current);
  return checksum(map);
}

export function part2(input) {
  input = input
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.");
  let { map, moves, current } = parse(input);
  moves.reduce((current, x) => move(map, current, x), current);
  return checksum(map);
}
