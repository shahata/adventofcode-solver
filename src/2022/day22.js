function turn(direction, to) {
  if (to === 'R') return (direction + 1) % 4;
  else return (4 + direction - 1) % 4;
}

function calcHeading(direction) {
  switch (direction) {
    case 0:
      return { x: 1, y: 0 };
    case 1:
      return { x: 0, y: 1 };
    case 2:
      return { x: -1, y: 0 };
    case 3:
      return { x: 0, y: -1 };
  }
}

function wrapLogic1(maze, pos) {
  const heading = calcHeading(pos.direction);
  const opposite = { x: heading.x * -1, y: heading.y * -1 };
  const wrap = { x: pos.x, y: pos.y, direction: pos.direction };
  while (
    maze[wrap.y + opposite.y] &&
    (maze[wrap.y + opposite.y][wrap.x + opposite.x] === '.' ||
      maze[wrap.y + opposite.y][wrap.x + opposite.x] === '#')
  ) {
    wrap.y += opposite.y;
    wrap.x += opposite.x;
  }
  return wrap;
}

function wrapLogic2(maze, pos) {
  let square;
  pos; //?
  if (pos.y < 50) {
    if (pos.x < 50) console.log('WAT');
    else if (pos.x < 100) square = 1;
    else square = 2;
  } else if (pos.y < 100) {
    if (pos.x < 50) console.log('WAT');
    else if (pos.x < 100) square = 3;
    else console.log('WAT');
  } else if (pos.y < 150) {
    if (pos.x < 50) square = 5;
    else if (pos.x < 100) square = 4;
    else console.log('WAT');
  } else {
    if (pos.x < 50) square = 6;
    else if (pos.x < 100) console.log('WAT');
    else console.log('WAT');
  }
  if (pos.direction === 0) {
    //right
    if (square === 1) {
      console.log('WAT');
    } else if (square === 2) {
      //
    } else if (square === 3) {
      //
    } else if (square === 4) {
      //
    } else if (square === 5) {
      console.log('WAT');
    } else if (square === 6) {
      //
    }
  } else if (pos.direction === 1) {
    //down
    if (square === 1) {
      console.log('WAT');
    } else if (square === 2) {
      //
    } else if (square === 3) {
      console.log('WAT');
    } else if (square === 4) {
      //
    } else if (square === 5) {
      console.log('WAT');
    } else if (square === 6) {
      //
    }
  } else if (pos.direction === 2) {
    //left
    if (square === 1) {
      //
    } else if (square === 2) {
      console.log('WAT');
    } else if (square === 3) {
      //
    } else if (square === 4) {
      console.log('WAT');
    } else if (square === 5) {
      //
    } else if (square === 6) {
      //
    }
  } else if (pos.direction === 3) {
    //up
    if (square === 1) {
      //
    } else if (square === 2) {
      //
    } else if (square === 3) {
      console.log('WAT');
    } else if (square === 4) {
      console.log('WAT');
    } else if (square === 5) {
      //
    } else if (square === 6) {
      console.log('WAT');
    }
  }
  // return result;
}

function walk(maze, pos, steps, wrapLogic) {
  for (let i = 0; i < steps; i++) {
    const heading = calcHeading(pos.direction);
    let next = {
      x: pos.x + heading.x,
      y: pos.y + heading.y,
      direction: pos.direction,
    };
    if (!maze[next.y]?.[next.x] || maze[next.y][next.x] === ' ') {
      next = wrapLogic(maze, pos);
    }
    if (maze[next.y][next.x] === '#') break;
    pos = next;
  }
  return pos;
}

export function part1(input, wrapLogic = wrapLogic1) {
  let [maze, directions] = input.split('\n\n');
  maze = maze.split('\n').map(line => line.split(''));
  let pos = { x: 0, y: 0, direction: 0 };
  while (maze[pos.y][pos.x] !== '.') pos.x++;
  while (directions !== '') {
    let steps = directions.match(/^\d+/);
    if (steps) {
      directions = directions.slice(steps[0].length);
      pos = walk(maze, pos, +steps[0], wrapLogic);
    }
    let to = directions.match(/^(R|L)/);
    if (to) {
      directions = directions.slice(1);
      pos.direction = turn(pos.direction, to[0]);
    }
  }
  return (pos.y + 1) * 1000 + (pos.x + 1) * 4 + pos.direction;
}

export function part2(input) {
  return part1(input, wrapLogic2);
}
