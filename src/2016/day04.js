import { lines } from '../utils/commons.js';

function parseRoom(s) {
  const [, name, sector, checksum] = s.match(/^(.*)-(\d+)\[(.*)\]$/);
  return { name, sector: +sector, checksum };
}

function checksum(s) {
  const occurrences = s
    .replace(/-/g, '')
    .split('')
    .sort()
    .reduce((obj, c) => {
      return { ...obj, [c]: (obj[c] || 0) + 1 };
    }, {});
  return Object.keys(occurrences)
    .map(x => ({ letter: x, times: occurrences[x] }))
    .sort(
      (a, b) =>
        b.times - a.times || a.letter.charCodeAt(0) - b.letter.charCodeAt(0),
    )
    .map(x => x.letter)
    .join('')
    .slice(0, 5);
}

function shift(c, t) {
  return String.fromCharCode(
    ((c.charCodeAt(0) - 'a'.charCodeAt(0) + t) % 26) + 'a'.charCodeAt(0),
  );
}

function decrypt(name, sector) {
  return name
    .split('-')
    .map(word =>
      word
        .split('')
        .map(c => shift(c, sector))
        .join(''),
    )
    .join(' ');
}

function parse(input) {
  return lines(input)
    .map(parseRoom)
    .filter(room => room.checksum === checksum(room.name));
}

export function part1(input) {
  const rooms = parse(input);
  return rooms.reduce((sum, room) => sum + room.sector, 0);
}

export function part2(input) {
  const rooms = parse(input);
  const room = rooms
    .map(room => decrypt(room.name, room.sector))
    .findIndex(x => x === 'northpole object storage');
  return rooms[room] && rooms[room].sector;
}
