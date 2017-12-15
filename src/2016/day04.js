function parseRoom(s) {
  const [, name, sector, checksum] = s.match(/^(.*)-(\d+)\[(.*)\]$/);
  return {name, sector: parseInt(sector, 10), checksum};
}

function checksum(s) {
  const occourences = s.replace(/-/g, '').split('').sort().reduce((obj, c) => {
    return Object.assign(obj, {[c]: (obj[c] || 0) + 1});
  }, {});
  return Object.keys(occourences)
               .map(x => ({letter: x, times: occourences[x]}))
               .sort((a, b) => a.times === b.times ? a.letter.charCodeAt(0) - b.letter.charCodeAt(0) : b.times - a.times)
               .map(x => x.letter)
               .join('')
               .slice(0, 5);
}

function shift(c, t) {
  return String.fromCharCode(((c.charCodeAt(0) - 'a'.charCodeAt(0) + t) % 26) + 'a'.charCodeAt(0));
}

function decrypt(name, sector) {
  return name.split('-').map(word => word.split('').map(c => shift(c, sector)).join('')).join(' ');
}

function day(input) {
  const rooms = input.split('\n').map(parseRoom).filter(room => room.checksum === checksum(room.name));
  const room = rooms.map(room => decrypt(room.name, room.sector)).findIndex(x => x === 'northpole object storage');
  const part1 = rooms.reduce((sum, room) => sum + room.sector, 0);
  const part2 = rooms[room] && rooms[room].sector;
  return [part1, part2];
}

module.exports = {day};
