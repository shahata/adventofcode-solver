import { execute } from './day09.js';

function createMap(input, commands) {
  let output = [];

  function move() {
    return commands.shift();
  }

  const user = { input: move, output: x => output.push(x), base: 0 };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  if (commands) {
    ops[0] = 2;
  }
  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }

  const map = output.map(x => String.fromCharCode(x)).join('');
  if (commands) {
    return output[output.length - 1];
  } else {
    return map.split('\n').map(l => l.split(''));
  }
}

function getNeighbors(map, x, y) {
  return [
    map[y - 1] && map[y - 1][x],
    map[y + 1] && map[y + 1][x],
    map[y][x - 1],
    map[y][x + 1],
  ].filter(a => a === '#');
}

function getLine(map, x, y, c) {
  let count = 0;
  const move = {
    '^': ({ x, y }) => ({ x, y: y - 1 }),
    v: ({ x, y }) => ({ x, y: y + 1 }),
    '<': ({ x, y }) => ({ x: x - 1, y }),
    '>': ({ x, y }) => ({ x: x + 1, y }),
  };
  let point = move[c]({ x, y });
  while (map[point.y] && map[point.y][point.x] === '#') {
    count++;
    point = move[c](point);
  }
  return count;
}

function findRoute(map) {
  const result = [];
  let y = map.findIndex(line => line.includes('^'));
  let x = map[y].indexOf('^');
  let c = '^';

  do {
    if (c === 'v' || c === '^') {
      const lineWest = getLine(map, x, y, '<');
      const lineEast = getLine(map, x, y, '>');
      if (lineWest > 0) {
        result.push(c === '^' ? 'L' : 'R', lineWest);
        c = '<';
        x -= lineWest;
      } else if (lineEast > 0) {
        result.push(c === '^' ? 'R' : 'L', lineEast);
        c = '>';
        x += lineEast;
      }
    } else if (c === '<' || c === '>') {
      const lineNorth = getLine(map, x, y, '^');
      const lineSouth = getLine(map, x, y, 'v');
      if (lineNorth > 0) {
        result.push(c === '>' ? 'L' : 'R', lineNorth);
        c = '^';
        y -= lineNorth;
      } else if (lineSouth > 0) {
        result.push(c === '>' ? 'R' : 'L', lineSouth);
        c = 'v';
        y += lineSouth;
      }
    }
  } while (getNeighbors(map, x, y).length > 1);

  return result;
}

export function part1(input) {
  const map = createMap(input);
  let calc = 0;
  map.forEach((line, y) => {
    line.forEach((c, x) => {
      if (c === '#') {
        if (getNeighbors(map, x, y).length > 2) {
          calc += x * y;
        }
      }
    });
  });
  return calc;
}

export function part2(input) {
  const map = createMap(input);
  const route = findRoute(map);
  const A = route.slice(0, 8).join(','); // this is probably specific to my input
  const B = route.slice(8, 16).join(','); // this is probably specific to my input
  const C = route.slice(24, 30).join(','); // this is probably specific to my input
  const main = route
    .join(',')
    .replace(new RegExp(A, 'g'), 'A')
    .replace(new RegExp(B, 'g'), 'B')
    .replace(new RegExp(C, 'g'), 'C');

  const commands = [main, A, B, C, 'n', '']
    .join('\n')
    .split('')
    .map(x => x.charCodeAt(0));
  return createMap(input, commands);
}
