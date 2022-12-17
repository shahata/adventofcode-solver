function toCells(shape) {
  const cells = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === '#') cells.push({ x, y });
    }
  }
  return { cells, shapeHeight: shape.length };
}

function moveIfPossible(cave, pos, cells, offset) {
  if (
    cells.every(
      cell =>
        cave[pos.y + cell.y + offset.y] &&
        cave[pos.y + cell.y + offset.y][pos.x + cell.x + offset.x] === '.',
    )
  ) {
    pos.x += offset.x;
    pos.y += offset.y;
    return true;
  }
  return false;
}

function detectLoop(cave, height, memory, window) {
  const snapshot = JSON.stringify(cave.slice(0, window));
  const found = memory.filter(s => s.snapshot === snapshot);
  if (found.length === 2) {
    const heightDiff = found[1].height - found[0].height;
    const indexDiff = memory.indexOf(found[1]) - memory.indexOf(found[0]);
    return { indexDiff, heightDiff };
  } else {
    memory.push({ snapshot, height });
  }
}

function dropShape(cave, cells, stream) {
  const pos = { x: 2, y: 0 };
  let done = false;
  while (!done) {
    const direction = stream.input[stream.index++ % stream.input.length];
    moveIfPossible(cave, pos, cells, { x: direction === '<' ? -1 : 1, y: 0 });
    if (!moveIfPossible(cave, pos, cells, { x: 0, y: 1 })) {
      cells.forEach(cell => (cave[pos.y + cell.y][pos.x + cell.x] = '#'));
      done = true;
    }
  }
  return pos.y;
}

export function part1(input, times = 2022) {
  const stream = { input, index: 0 };
  const shapes = [
    ['####'],
    ['.#.', '###', '.#.'],
    ['..#', '..#', '###'],
    ['#', '#', '#', '#'],
    ['##', '##'],
  ].map(toCells);

  const cave = [];
  let memory = [];
  let depth = 0;
  let height = 0;
  for (let i = 0; i < times; i++) {
    const { cells, shapeHeight } = shapes[i % shapes.length];
    while (depth < height + shapeHeight + 3) {
      cave.unshift(new Array(7).fill('.'));
      depth++;
    }
    while (depth > height + shapeHeight + 3) {
      cave.shift();
      depth--;
    }
    const loop = memory && detectLoop(cave, height, memory, 100);
    if (loop) {
      const mul = Math.floor((times - i) / loop.indexDiff);
      i += mul * loop.indexDiff;
      height += mul * loop.heightDiff;
      depth += mul * loop.heightDiff;
      memory = null;
    }
    const y = dropShape(cave, cells, stream);
    height = Math.max(height, depth - y);
  }
  return height;
}

export function part2(input) {
  return part1(input, 1000000000000);
}
