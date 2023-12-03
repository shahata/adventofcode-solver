function signed(map, i, j) {
  const neighbors = [
    map[i - 1]?.[j - 1],
    map[i - 1]?.[j],
    map[i - 1]?.[j + 1],
    map[i]?.[j - 1],
    map[i]?.[j + 1],
    map[i + 1]?.[j - 1],
    map[i + 1]?.[j],
    map[i + 1]?.[j + 1],
  ];
  return neighbors.some(n => n !== '.' && (n < '0' || n > '9'));
}

function gear(map, i, j) {
  const neighbors = [
    { x: i - 1, y: j - 1, c: map[i - 1]?.[j - 1] },
    { x: i - 1, y: j, c: map[i - 1]?.[j] },
    { x: i - 1, y: j + 1, c: map[i - 1]?.[j + 1] },
    { x: i, y: j - 1, c: map[i]?.[j - 1] },
    { x: i, y: j + 1, c: map[i]?.[j + 1] },
    { x: i + 1, y: j - 1, c: map[i + 1]?.[j - 1] },
    { x: i + 1, y: j, c: map[i + 1]?.[j] },
    { x: i + 1, y: j + 1, c: map[i + 1]?.[j + 1] },
  ];
  const gears = neighbors.filter(n => n.c === '*');
  if (gears.length > 1) {
    console.log(gears); //?
  }
  return gears.length === 0 ? undefined : `${gears[0].x},${gears[0].y}`;
}

export function part1(input) {
  const map = input.split('\n').map(line => line.split(''));
  let current = '';
  let sign = false;
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char >= '0' && char <= '9') {
        current += char;
        if (signed(map, i, j)) {
          sign = true;
        }
      } else {
        if (current) {
          if (sign) sum += +current;
          current = '';
          sign = false;
        }
      }
    }
    if (current) {
      if (sign) sum += +current;
      current = '';
      sign = false;
    }
  }
  return sum;
}

export function part2(input) {
  const map = input.split('\n').map(line => line.split(''));
  let current = '';
  let pos = undefined;
  let gears = {};
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char >= '0' && char <= '9') {
        current += char;
        pos = pos || gear(map, i, j);
      } else {
        if (current) {
          if (pos)
            gears[pos] = gears[pos] ? gears[pos].concat(current) : [+current];
          current = '';
          pos = undefined;
        }
      }
    }
    if (current) {
      if (pos)
        gears[pos] = gears[pos] ? gears[pos].concat(current) : [+current];
      current = '';
      pos = undefined;
    }
  }
  gears = Object.values(gears).map(gear => {
    if (gear.length > 1) {
      return gear.reduce((a, b) => a * b, 1);
    } else {
      return 0;
    }
  });
  return Object.values(gears).reduce((a, b) => a + b, 0);
}
