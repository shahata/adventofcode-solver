function parse(input) {
  let disk = [];
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) disk.push({ id: i / 2, count: +input[i] });
    else disk.push({ id: -1, count: +input[i] });
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
  let add = [
    { id: disk[i].id, count },
    { id: disk[i].id, count: disk[i].count - count },
  ];
  disk.splice(i, 1, ...add);
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
  let tmp = disk[to].id;
  disk[to].id = disk[from].id;
  disk[from].id = tmp;
  return from;
}

export function part1(input, part2 = false) {
  let disk = parse(input);
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
