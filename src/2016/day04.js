function parseRoom(s) {
  const [, name, sector, checksum] = s.match(/^(.*)-(\d+)\[(.*)\]$/);
  return { name, sector: parseInt(sector, 10), checksum };
}

function checksum(s) {
  const occurences = s
    .replace(/-/g, '')
    .split('')
    .sort()
    .reduce((obj, c) => {
      return { ...obj, [c]: (obj[c] || 0) + 1 };
    }, {});
  return Object.keys(occurences)
    .map(x => ({ letter: x, times: occurences[x] }))
    .sort((a, b) =>
      a.times === b.times
        ? a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
        : b.times - a.times,
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
  return input
    .split('\n')
    .map(parseRoom)
    .filter(room => room.checksum === checksum(room.name));
}

function part1(input) {
  const rooms = parse(input);
  return rooms.reduce((sum, room) => sum + room.sector, 0);
}

function part2(input) {
  const rooms = parse(input);
  const room = rooms
    .map(room => decrypt(room.name, room.sector))
    .findIndex(x => x === 'northpole object storage');
  return rooms[room] && rooms[room].sector;
}

module.exports = { part1, part2 };
