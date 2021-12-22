import { execute } from './day09.js';
import { ocr } from '../utils/ocr.js';

function move({ x, y }, direction) {
  const directions = {
    '^': { x, y: y - 1 },
    'v': { x, y: y + 1 },
    '<': { x: x - 1, y },
    '>': { x: x + 1, y },
  };
  return directions[direction];
}

const left = {
  '^': '<',
  '<': 'v',
  'v': '>',
  '>': '^',
};

const right = {
  '^': '>',
  '>': 'v',
  'v': '<',
  '<': '^',
};

export function part1(input, map = {}) {
  let direction = '^';
  let position = { x: 0, y: 0 };
  let outputMode = true;

  function write(value) {
    if (outputMode) {
      map[`${position.x},${position.y}`].value = value;
      map[`${position.x},${position.y}`].writes++;
    } else {
      direction = value === 0 ? left[direction] : right[direction];
      position = move(position, direction);
    }
    outputMode = !outputMode;
  }

  function read() {
    map[`${position.x},${position.y}`] = map[`${position.x},${position.y}`] || {
      value: 0,
      writes: 0,
    };
    return map[`${position.x},${position.y}`].value;
  }

  const user = { input: read, output: write, base: 0 };
  const ops = input.split(',').map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return Object.values(map).length;
}

export function part2(input) {
  const map = { '0,0': { value: 1, writes: 0 } };
  part1(input, map);

  const coordinates = Object.keys(map)
    .map(k => k.split(',').map(i => +i))
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  const lines = [];
  for (let y = first[1]; y <= last[1]; y++) {
    let line = '';
    for (let x = first[0]; x <= last[0]; x++) {
      line += map[`${x},${y}`] && map[`${x},${y}`].value === 1 ? '#' : '.';
    }
    lines.push(line);
  }
  return ocr(lines.join('\n'));
}
