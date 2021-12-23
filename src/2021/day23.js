function getPath(x1, x2) {
  const path = [];
  let x = x1;
  while (x !== x2) {
    x += x > x2 ? -1 : 1;
    path.push(x);
  }
  return path;
}

function neighbors({ state, energy }) {
  const prices = { A: 1, B: 10, C: 100, D: 1000 };
  const target = { A: 3, B: 5, C: 7, D: 9 };
  return state.flatMap(member => {
    if (member.y === 1) {
      const deep =
        state.find(m => m.x === target[member.sign] && m.y === 2) ||
        state.find(m => m.x === target[member.sign] && m.y === 3) ||
        state.find(m => m.x === target[member.sign] && m.y === 4) ||
        state.find(m => m.x === target[member.sign] && m.y === 5);
      if (deep && deep.sign !== member.sign) return [];
      const end = {
        sign: member.sign,
        x: target[member.sign],
        y: deep ? deep.y - 1 : state.length === 8 ? 3 : 5,
      };
      const path = getPath(member.x, end.x);
      if (path.some(x => state.find(m => m.x === x && m.y === 1))) return [];
      return [
        {
          state: state.map(m => (m !== member ? m : end)),
          energy: energy + prices[member.sign] * (path.length + end.y - 1),
        },
      ];
    } else {
      if (
        getPath(member.y, 2).some(y =>
          state.find(m => m.x === member.x && m.y === y),
        )
      )
        return [];
      const options = [];
      for (
        let i = member.x;
        i <= 11 && !state.find(m => m.x === i && m.y === 1);
        i++
      ) {
        if (i !== 3 && i !== 5 && i !== 7 && i !== 9) options.push(i);
      }
      for (
        let i = member.x;
        i >= 1 && !state.find(m => m.x === i && m.y === 1);
        i--
      ) {
        if (i !== 3 && i !== 5 && i !== 7 && i !== 9) options.push(i);
      }
      return options.map(x => {
        const end = { sign: member.sign, x, y: 1 };
        return {
          state: state.map(m => (m !== member ? m : end)),
          energy:
            energy +
            prices[member.sign] * (Math.abs(member.x - x) + member.y - 1),
        };
      });
    }
  });
}

const toKey = state =>
  state
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map(s => `${s.x},${s.y},${s.sign}`)
    .join(':');

function solve(start, end) {
  const visited = new Map();
  const queue = [{ state: start, energy: 0 }];
  while (queue.length > 0) {
    const n = queue.shift();
    if (toKey(n.state) === end) {
      return n.energy;
    }
    neighbors(n).forEach(neighbor => {
      const v = visited.get(toKey(neighbor.state));
      if (!v || neighbor.energy < v.energy) {
        if (v) queue.splice(queue.indexOf(v), 1);
        visited.set(toKey(neighbor.state), neighbor);
        queue.push(neighbor);
      }
    });
    queue.sort((a, b) => a.energy - b.energy);
  }
  return 'no solution';
}

function parse(input) {
  const maze = input.split('\n').map(line => line.split(''));
  let state = [];
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (
        maze[y][x] === 'A' ||
        maze[y][x] === 'B' ||
        maze[y][x] === 'C' ||
        maze[y][x] === 'D'
      ) {
        state.push({ x, y, sign: maze[y][x] });
        maze[y][x] = '.';
      }
    }
  }
  return state.sort((a, b) => a.x - b.x || a.y - b.y);
}

export function part1(input) {
  const solved = [
    '#############',
    '#...........#',
    '###A#B#C#D###',
    '  #A#B#C#D#',
    '  #########',
  ].join('\n');
  const start = parse(input);
  const end = parse(solved);
  return solve(start, toKey(end));
}

export function part2(input) {
  const solved = [
    '#############',
    '#...........#',
    '###A#B#C#D###',
    '  #A#B#C#D#',
    '  #A#B#C#D#',
    '  #A#B#C#D#',
    '  #########',
  ].join('\n');
  input = input.split('\n');
  input.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#');
  input = input.join('\n');
  const start = parse(input);
  const end = parse(solved);
  return solve(start, toKey(end));
}
