function drop(pit, x, y) {
  const queue = [{ x, y }];
  const visited = new Set();
  const add = ({ x, y }) => {
    if (!visited.has(`${x},${y}`)) {
      queue.push({ x, y });
      visited.add(`${x},${y}`);
    }
  };
  while (queue.length > 0) {
    const next = queue.shift();
    pit[next.y][next.x] = '|';
    if (pit[next.y + 1] && pit[next.y + 1][next.x] === '.') {
      add({ x: next.x, y: next.y + 1 });
    } else if (pit[next.y + 1] && pit[next.y + 1][next.x] !== '|') {
      if (pit[next.y][next.x - 1] === '.') {
        add({ x: next.x - 1, y: next.y });
      }
      if (pit[next.y][next.x + 1] === '.') {
        add({ x: next.x + 1, y: next.y });
      }
    }
  }
  pit.forEach((line, y) => {
    let start;
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '#' && start !== undefined) {
        for (let i = start; i < x; i++) {
          line[i] = '~';
        }
      }
      if (line[x] === '|' && pit[y + 1] && pit[y + 1][x] !== '|') {
        start = line[x - 1] === '#' ? x : start;
      } else {
        start = undefined;
      }
    }
  });
  return {
    wet: pit.reduce((sum, line) => sum + line.filter(x => x === '|').length, 0),
    dry: pit.reduce((sum, line) => sum + line.filter(x => x === '~').length, 0),
  };
}

function fill(pit, base) {
  let count = {dry: -1, wet: -1},
    newCount = { wet: 0, dry: 0 };
  while (count.dry !== newCount.dry || count.wet !== newCount.wet) {
    count = {...newCount};
    pit.forEach(
      (line, i) =>
        (pit[i] = line
          .join('')
          .replace(/\|/g, '.')
          .split('')),
    );
    newCount = drop(pit, 500 - base.x, 0);
  }
  return newCount;
}

function day(input) {
  const base = { x: Infinity, y: Infinity };
  const end = { x: -Infinity, y: -Infinity };
  const lines = input.split('\n').map(x => {
    const result = x.match(/^([xy])=(\d+), ([xy])=(\d+)\.\.(\d+)$/);
    const [, axis, num, rangeAxis, from, to] = result;
    return {
      axis,
      num: parseInt(num),
      rangeAxis,
      from: parseInt(from),
      to: parseInt(to),
    };
  });
  lines.forEach(line => {
    base[line.axis] = Math.min(base[line.axis], line.num);
    base[line.rangeAxis] = Math.min(base[line.rangeAxis], line.from);
    end[line.axis] = Math.max(end[line.axis], line.num);
    end[line.rangeAxis] = Math.max(end[line.rangeAxis], line.to);
  });
  base.x--;
  end.x++;
  const pit = new Array(end.y - base.y + 1)
    .fill()
    .map(() => new Array(end.x - base.x + 1).fill('.'));
  lines.forEach(line => {
    if (line.rangeAxis === 'x') {
      for (let x = line.from; x <= line.to; x++) {
        pit[line.num - base.y][x - base.x] = '#';
      }
    } else {
      for (let y = line.from; y <= line.to; y++) {
        pit[y - base.y][line.num - base.x] = '#';
      }
    }
  });
  const result = fill(pit, base, end);
  return { part1: result.wet + result.dry, part2: result.dry };
}

module.exports = { day };
