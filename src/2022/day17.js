const shapes = [
  ['####'],
  ['.#.', '###', '.#.'],
  ['..#', '..#', '###'],
  ['#', '#', '#', '#'],
  ['##', '##'],
];

function toCells(shape) {
  const result = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === '#') result.push({ x, y });
    }
  }
  return result;
}

export function part1(input, times = 2022) {
  let memory = [];
  const memory2 = [];
  const cave = [];
  let depth = 0;
  let si = 0,
    height = 0;
  for (let i = 0; i < times; i++) {
    const shape = shapes[i % shapes.length];
    const cells = toCells(shape);
    while (depth < height + 3 + shape.length) {
      cave.unshift(new Array(7).fill('.'));
      depth++;
    }
    while (depth > height + 3 + shape.length) {
      cave.shift();
      depth--;
    }
    if (memory) {
      const snapshot = JSON.stringify({ lines: cave.slice(0, 1000), shape });
      const found = memory.filter(s => s === snapshot);
      if (found.length === 2) {
        const i1 = memory.indexOf(found[0]);
        const i2 = memory.lastIndexOf(found[1]);
        const hdiff = memory2[i2] - memory2[i1];
        const idiff = i2 - i1;
        const mul = Math.floor((times - i) / idiff);
        i += mul * idiff;
        height += mul * hdiff;
        depth += mul * hdiff;
        memory = null;
      } else {
        memory.push(snapshot);
        memory2.push(height);
      }
    }
    const location = { x: 2, y: 0 };
    let resting = false;
    let falling = false;
    while (!resting) {
      if (!falling) {
        const stream = input[si % input.length];
        si++;
        if (stream === '<') {
          if (
            cells.every(
              cell =>
                cave[location.y + cell.y][location.x + cell.x - 1] === '.',
            )
          ) {
            location.x--;
          }
        } else if (stream === '>') {
          if (
            cells.every(
              cell =>
                cave[location.y + cell.y][location.x + cell.x + 1] === '.',
            )
          ) {
            location.x++;
          }
        }
        falling = true;
      } else {
        if (
          cells.every(
            cell =>
              cave[location.y + cell.y + 1] &&
              cave[location.y + cell.y + 1][location.x + cell.x] === '.',
          )
        ) {
          location.y++;
        } else {
          cells.forEach(cell => {
            height = Math.max(depth - (location.y + cell.y), height);
            cave[location.y + cell.y][location.x + cell.x] = '#';
          });
          resting = true;
        }
        falling = false;
      }
    }
  }
  return height;
}

export function part2(input) {
  return part1(input, 1000000000000);
}
