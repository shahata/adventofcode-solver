import { ocr } from '../utils/ocr.js';

function move(points, seconds) {
  return points.map(p => ({
    x: p.x + p.xDiff * seconds,
    y: p.y + p.yDiff * seconds,
  }));
}

function size(points) {
  return points.reduce(
    ({ start, end }, p) => ({
      start: { x: Math.min(start.x, p.x), y: Math.min(start.y, p.y) },
      end: { x: Math.max(end.x, p.x + 1), y: Math.max(end.y, p.y + 1) },
    }),
    {
      start: { x: Infinity, y: Infinity },
      end: { x: -Infinity, y: -Infinity },
    },
  );
}

function print(points) {
  const { start, end } = size(points);
  const arr = (size, fill) => new Array(size).fill(fill);
  const banner = arr(end.y - start.y).map(() => arr(end.x - start.x, '.'));
  points.forEach(p => (banner[p.y - start.y][p.x - start.x] = '#'));
  return banner.map(x => x.join('')).join('\n');
}

export function day(input) {
  const regex = /([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)+/;
  const points = input.split('\n').map(line => {
    const [, x, y, xDiff, yDiff] = line.match(regex).map(x => +x);
    return { x, y, xDiff, yDiff };
  });

  let secs = -1;
  let currentHeight, nextHeight;
  const height = ({ start, end }) => end.y - start.y;
  do {
    secs++;
    currentHeight = nextHeight || height(size(move(points, secs)));
    nextHeight = height(size(move(points, secs + 1)));
  } while (currentHeight > nextHeight); //text visible in minimal height

  return { part1: ocr(print(move(points, secs))), part2: secs };
}
