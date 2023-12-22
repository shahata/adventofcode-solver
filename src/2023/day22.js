function fall(bricks) {
  let change = true;
  while (change) {
    change = false;
    for (let brick of bricks) {
      do {
        change = false;
        let otherBricks = bricks.filter(b => b !== brick);
        if (
          brick.some(b => {
            const s = `${b[0]},${b[1]},${b[2] - 1}`;
            if (b[2] === 1) return true;
            if (
              otherBricks.some(x =>
                x.some(o => `${o[0]},${o[1]},${o[2]}` === s),
              )
            )
              return true;
          })
        ) {
          continue;
        } else {
          brick.forEach(b => b[2]--);
          change = true;
        }
      } while (change);
    }
  }
}

function parse(input) {
  let bricks = input.split('\n').map(line => {
    const [a, b] = line.split('~').map(x => x.split(',').map(y => +y));
    const body = [];
    for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
      for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
        for (let z = Math.min(a[2], b[2]); z <= Math.max(a[2], b[2]); z++) {
          body.push([x, y, z]);
        }
      }
    }
    return body;
  });
  return bricks.sort(
    (a, b) => Math.min(...a.map(x => x[2])) - Math.min(...b.map(x => x[2])),
  );
}

export function part1(input) {
  const bricks = parse(input);
  fall(bricks);

  let important = new Set();
  for (let brick of bricks) {
    const me = bricks.indexOf(brick);
    const support = new Set(
      brick
        .map(b =>
          bricks.findIndex(x =>
            x.some(
              o => `${o[0]},${o[1]},${o[2]}` === `${b[0]},${b[1]},${b[2] - 1}`,
            ),
          ),
        )
        .filter(x => x !== -1 && x !== me),
    );
    if (support.size === 1) {
      support.forEach(x => important.add(x));
    }
  }
  return bricks.length - important.size;
}

export function part2(input) {
  const bricks = parse(input);
  fall(bricks);

  let moved = 0;
  for (let brick of bricks) {
    const backup = JSON.stringify(bricks.filter(b => b !== brick));
    const test = JSON.parse(backup);
    fall(test);
    const before = JSON.parse(backup);
    for (let i = 0; i < before.length; i++) {
      if (JSON.stringify(before[i]) !== JSON.stringify(test[i])) {
        moved++;
      }
    }
  }
  return moved;
}
