import { execute } from './day09.js';

function createMap(input, commands) {
  let output = [];

  const user = {
    input: () => commands.shift(),
    output: x => output.push(x),
    base: 0,
  };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  ops[0] = commands ? 2 : ops[0];
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
  ].filter(c => c === '#');
}

function getLine(map, x, y, c) {
  const move = {
    '^': ({ x, y }) => ({ x, y: y - 1 }),
    'v': ({ x, y }) => ({ x, y: y + 1 }),
    '<': ({ x, y }) => ({ x: x - 1, y }),
    '>': ({ x, y }) => ({ x: x + 1, y }),
  };
  let point = move[c]({ x, y });
  while (map[point.y] && map[point.y][point.x] === '#') {
    point = move[c](point);
  }
  return Math.abs(point.x - x) + Math.abs(point.y - y) - 1;
}

function findRoute(map) {
  const result = [];
  const c = map
    .reduce((prev, line) => prev.concat(line), [])
    .find(c => '^v<>'.includes(c));
  const y = map.findIndex(line => line.includes(c));
  const x = map[y].indexOf(c);
  let current = { x, y, c };

  do {
    if (current.c === 'v' || current.c === '^') {
      const lineWest = getLine(map, current.x, current.y, '<');
      const lineEast = getLine(map, current.x, current.y, '>');
      if (lineWest > 0) {
        result.push(current.c === '^' ? 'L' : 'R', lineWest);
        current = { c: '<', x: current.x - lineWest, y: current.y };
      } else if (lineEast > 0) {
        result.push(current.c === '^' ? 'R' : 'L', lineEast);
        current = { c: '>', x: current.x + lineEast, y: current.y };
      }
    } else if (current.c === '<' || current.c === '>') {
      const lineNorth = getLine(map, current.x, current.y, '^');
      const lineSouth = getLine(map, current.x, current.y, 'v');
      if (lineNorth > 0) {
        result.push(current.c === '>' ? 'L' : 'R', lineNorth);
        current = { c: '^', x: current.x, y: current.y - lineNorth };
      } else if (lineSouth > 0) {
        result.push(current.c === '>' ? 'R' : 'L', lineSouth);
        current = { c: 'v', x: current.x, y: current.y + lineSouth };
      }
    }
  } while (getNeighbors(map, current.x, current.y).length > 1);

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
