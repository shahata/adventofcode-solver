function north(lines) {
  for (let x = 0; x < lines[0].length; x++) {
    let target = 0;
    for (let y = 0; y < lines.length; y++) {
      if (lines[y][x] === 'O') {
        lines[y][x] = '.';
        lines[target][x] = 'O';
        target++;
      }
      if (lines[y][x] === '#') {
        target = y + 1;
      }
    }
  }
}

function west(lines) {
  for (let y = 0; y < lines.length; y++) {
    let target = 0;
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === 'O') {
        lines[y][x] = '.';
        lines[y][target] = 'O';
        target++;
      }
      if (lines[y][x] === '#') {
        target = x + 1;
      }
    }
  }
}

function south(lines) {
  for (let x = 0; x < lines[0].length; x++) {
    let target = lines.length - 1;
    for (let y = lines.length - 1; y >= 0; y--) {
      if (lines[y][x] === 'O') {
        lines[y][x] = '.';
        lines[target][x] = 'O';
        target--;
      }
      if (lines[y][x] === '#') {
        target = y - 1;
      }
    }
  }
}

function east(lines) {
  for (let y = 0; y < lines.length; y++) {
    let target = lines[0].length - 1;
    for (let x = lines[0].length - 1; x >= 0; x--) {
      if (lines[y][x] === 'O') {
        lines[y][x] = '.';
        lines[y][target] = 'O';
        target--;
      }
      if (lines[y][x] === '#') {
        target = x - 1;
      }
    }
  }
}

function weight(lines) {
  let result = 0;
  for (let i = 0; i < lines[0].length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][i] === 'O') {
        result += lines.length - j;
      }
    }
  }
  return result;
}

export function part1(input) {
  const lines = input.split('\n').map(line => line.split(''));
  north(lines);
  return weight(lines);
}

export function part2(input) {
  const lines = input.split('\n').map(line => line.split(''));
  const memory = new Map();
  const count = 1000000000;
  for (let i = 0; i < count; i++) {
    north(lines);
    west(lines);
    south(lines);
    east(lines);

    const key = JSON.stringify(lines);
    const index = memory.get(key);
    if (index !== undefined) {
      i += Math.floor((count - i - 1) / (i - index)) * (i - index);
    } else {
      memory.set(key, i);
    }
  }
  return weight(lines);
}
