function domove(map, current, move) {
  let dest = { x: current.x, y: current.y };
  if (move === "v") {
    dest.y++;
  } else if (move === "^") {
    dest.y--;
  } else if (move === "<") {
    dest.x--;
  } else if (move === ">") {
    dest.x++;
  }
  if (map[dest.y][dest.x] === "O") {
    domove(map, dest, move);
  }
  if (map[dest.y][dest.x] === "#") {
    return current;
  }
  if (map[dest.y][dest.x] === ".") {
    map[dest.y][dest.x] = map[current.y][current.x];
    map[current.y][current.x] = ".";
    return dest;
  }
  return current;
}

function domove2(map, current, move) {
  let dest = { x: current.x, y: current.y };
  if (move === "v") {
    dest.y++;
  } else if (move === "^") {
    dest.y--;
  } else if (move === "<") {
    dest.x--;
  } else if (move === ">") {
    dest.x++;
  }
  if (map[dest.y][dest.x] === "[" || map[dest.y][dest.x] === "]") {
    if (move === ">" || move === "<") domove2(map, dest, move);
    else {
      if (map[dest.y][dest.x] === "[") {
        let copy = map.map(row => row.slice(0));
        let pair = { ...dest, x: dest.x + 1 };
        if (
          domove2(copy, dest, move) !== dest &&
          domove2(copy, pair, move) !== pair
        ) {
          domove2(map, dest, move);
          domove2(map, pair, move);
        }
      }
      if (map[dest.y][dest.x] === "]") {
        let copy = map.map(row => row.slice(0));
        let pair = { ...dest, x: dest.x - 1 };
        if (
          domove2(copy, dest, move) !== dest &&
          domove2(copy, pair, move) !== pair
        ) {
          domove2(map, dest, move);
          domove2(map, pair, move);
        }
      }
    }
  }
  if (map[dest.y][dest.x] === "#") {
    return current;
  }
  if (map[dest.y][dest.x] === ".") {
    map[dest.y][dest.x] = map[current.y][current.x];
    map[current.y][current.x] = ".";
    return dest;
  }
  return current;
}

export function part1(input) {
  let [map, moves] = input.split("\n\n");
  map = map.split("\n").map(row => row.split(""));
  moves = moves.split("").filter(x => x !== "\n");
  let y = map.findIndex(row => row.includes("@"));
  let x = map[y].findIndex(cell => cell === "@");
  let current = { x, y };
  for (let i = 0; i < moves.length; i++) {
    current = domove(map, current, moves[i]);
  }

  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") sum += 100 * i + j;
    }
  }

  return sum;
}

export function part2(input) {
  let [map, moves] = input.split("\n\n");
  map = map
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.");
  map = map.split("\n").map(row => row.split(""));
  moves = moves.split("").filter(x => x !== "\n");

  let y = map.findIndex(row => row.includes("@"));
  let x = map[y].findIndex(cell => cell === "@");
  let current = { x, y };
  for (let i = 0; i < moves.length; i++) {
    current = domove2(map, current, moves[i]);
  }

  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "[") sum += 100 * i + j;
    }
  }

  return sum;
}
