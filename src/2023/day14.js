function vertical(lines, add) {
  for (let x = 0; x < lines[0].length; x++) {
    let target = add > 0 ? 0 : lines.length - 1;
    for (let y = target; y >= 0 && y < lines.length; y += add) {
      if (lines[y][x] === "O") {
        lines[y][x] = ".";
        lines[target][x] = "O";
        target += add;
      }
      if (lines[y][x] === "#") target = y + add;
    }
  }
}

function horizontal(lines, add) {
  for (let y = 0; y < lines.length; y++) {
    let target = add > 0 ? 0 : lines[0].length - 1;
    for (let x = target; x >= 0 && x < lines[0].length; x += add) {
      if (lines[y][x] === "O") {
        lines[y][x] = ".";
        lines[y][target] = "O";
        target += add;
      }
      if (lines[y][x] === "#") target = x + add;
    }
  }
}

function weight(lines) {
  return lines.reduce((acc, line, y) => {
    return acc + line.filter(x => x === "O").length * (lines.length - y);
  }, 0);
}

export function part1(input) {
  let lines = input.split("\n").map(line => line.split(""));
  vertical(lines, 1);
  return weight(lines);
}

export function part2(input) {
  let lines = input.split("\n").map(line => line.split(""));
  let memory = new Map();
  let count = 1000000000;
  for (let i = 1; i <= count; i++) {
    let key = lines.map(line => line.join("")).join("\n");
    if (memory.has(key)) i = count - ((count - i) % (i - memory.get(key)));
    else memory.set(key, i);

    vertical(lines, 1);
    horizontal(lines, 1);
    vertical(lines, -1);
    horizontal(lines, -1);
  }
  return weight(lines);
}
