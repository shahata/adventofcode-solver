function toCells(shape) {
  let cells = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === "#") cells.push({ x, y });
    }
  }
  return { cells, shapeHeight: shape.length };
}

function moveIfPossible(cave, pos, cells, offset) {
  let next = { x: pos.x + offset.x, y: pos.y + offset.y };
  if (cells.every(cell => cave[next.y + cell.y]?.[next.x + cell.x] === ".")) {
    pos.x += offset.x;
    pos.y += offset.y;
    return true;
  }
  return false;
}

function detectLoop(cave, height, memory, window) {
  let snapshot = JSON.stringify(cave.slice(0, window));
  let found = memory.filter(s => s.snapshot === snapshot);
  if (found.length === 2) {
    return {
      indexDiff: found[1].index - found[0].index,
      heightDiff: found[1].height - found[0].height,
    };
  } else {
    memory.push({ snapshot, height, index: memory.length });
  }
}

function dropShape(cave, cells, stream) {
  let pos = { x: 2, y: 0 };
  let done = false;
  while (!done) {
    let direction = stream.input[stream.index++ % stream.input.length];
    moveIfPossible(cave, pos, cells, { x: direction === "<" ? -1 : 1, y: 0 });
    if (!moveIfPossible(cave, pos, cells, { x: 0, y: 1 })) {
      cells.forEach(cell => (cave[pos.y + cell.y][pos.x + cell.x] = "#"));
      done = true;
    }
  }
  return pos.y;
}

export function part1(input, times = 2022) {
  let stream = { input, index: 0 };
  let shapes = [
    ["####"],
    [".#.", "###", ".#."],
    ["..#", "..#", "###"],
    ["#", "#", "#", "#"],
    ["##", "##"],
  ].map(toCells);

  let cave = [];
  let memory = [];
  let depth = 0;
  let height = 0;
  for (let i = 0; i < times; i++) {
    let { cells, shapeHeight } = shapes[i % shapes.length];
    while (depth < height + shapeHeight + 3) {
      cave.unshift(new Array(7).fill("."));
      depth++;
    }
    while (depth > height + shapeHeight + 3) {
      cave.shift();
      depth--;
    }
    let loop = memory && detectLoop(cave, height, memory, 100);
    if (loop) {
      let mul = Math.floor((times - i) / loop.indexDiff);
      i += mul * loop.indexDiff;
      depth += mul * loop.heightDiff;
      height += mul * loop.heightDiff;
      memory = null;
    }
    let y = dropShape(cave, cells, stream);
    height = Math.max(height, depth - y);
  }
  return height;
}

export function part2(input) {
  return part1(input, 1000000000000);
}
