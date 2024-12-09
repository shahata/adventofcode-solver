function parse(input) {
  const disk = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const count = +input[i];
    if (i % 2 === 0) disk.push({ id: id++, count });
    else disk.push({ id: -1, count });
  }
  return disk;
}

function checksum(disk) {
  let sum = 0;
  let index = 0;
  for (let i = 0; i < disk.length; i++) {
    for (let j = 0; j < disk[i].count; j++) {
      if (disk[i].id !== -1) sum += disk[i].id * index;
      index++;
    }
  }
  return sum;
}

function split(disk, i, count) {
  disk.splice(i + 1, 0, { id: disk[i].id, count: disk[i].count - count });
  disk[i].count = count;
}

function move(disk, from, to) {
  if (disk[to].count > disk[from].count) {
    split(disk, to, disk[from].count);
    from++;
  }
  if (disk[from].count > disk[to].count) {
    split(disk, from, disk[from].count - disk[to].count);
    from++;
  }
  if (disk[to].count === disk[from].count) {
    disk[to].id = disk[from].id;
    disk[from].id = -1;
  }
  return from;
}

export function part1(input, part2 = false) {
  const disk = parse(input);
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i].id === -1) continue;
    let empty = part2
      ? disk.findIndex(d => d.id === -1 && d.count >= disk[i].count)
      : disk.findIndex(d => d.id === -1);
    if (empty !== -1 && empty < i) i = move(disk, i, empty);
  }
  return checksum(disk);
}

export function part2(input) {
  return part1(input, true);
}
