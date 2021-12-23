const toKey = state =>
  state
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map(s => `${s.x},${s.y},${s.sign}`)
    .join(':');

function neighbors({ state, energy: curr }) {
  const price = { A: 1, B: 10, C: 100, D: 1000 };
  const home = { A: 3, B: 5, C: 7, D: 9 };
  const move = (a, b) => ({
    state: state.map(m => (m !== a ? m : { ...b, done: b.y !== 1 })),
    energy: curr + price[a.sign] * (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)),
  });
  return state.flatMap(member => {
    const { x, y, sign } = member;
    const is = (x, y) => m => m.x === x && m.y === y;
    if (y === 1) {
      const go = { sign, x: home[sign], y: state.length === 8 ? 3 : 5 };
      if (state.some(m => (m.x - x) * (m.x - go.x) < 0 && m.y === 1)) return [];
      if (state.some(m => m.x === go.x && m.sign !== sign)) return [];
      while (state.some(is(go.x, go.y))) go.y--;
      return [move(member, go)];
    } else {
      let options = [];
      if (member.done) return [];
      if (state.some(m => m.x === x && m.y < y)) return [];
      for (let i = x; i <= 11 && !state.some(is(i, 1)); i++) options.push(i);
      for (let i = x; i >= 1 && !state.some(is(i, 1)); i--) options.push(i);
      options = options.filter(i => ![3, 5, 7, 9].includes(i));
      return options.map(x => move(member, { sign, x, y: 1 }));
    }
  });
}

function solve(start, end) {
  const visited = new Map();
  const queue = [{ state: start, energy: 0 }];
  while (queue.length > 0) {
    const n = queue.sort((a, b) => a.energy - b.energy).shift();
    if (toKey(n.state) === end) return n.energy;
    neighbors(n).forEach(neighbor => {
      const v = visited.get(toKey(neighbor.state));
      if (!v || neighbor.energy < v.energy) {
        if (v) queue.splice(queue.indexOf(v), 1);
        visited.set(toKey(neighbor.state), neighbor);
        queue.push(neighbor);
      }
    });
  }
}

function parse(input) {
  const maze = input.map(line => line.split(''));
  const state = [];
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x].match(/[A-Z]/)) {
        state.push({ x, y, sign: maze[y][x] });
      }
    }
  }
  return state;
}

let solved = [
  '#############',
  '#...........#',
  '###A#B#C#D###',
  '  #A#B#C#D#',
  '  #########',
];

export function part1(input) {
  return solve(parse(input.split('\n')), toKey(parse(solved)));
}

export function part2(input) {
  const solved2 = solved.slice(0);
  input = input.split('\n');
  input.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#');
  solved2.splice(3, 0, '  #A#B#C#D#', '  #A#B#C#D#');
  return solve(parse(input), toKey(parse(solved2)));
}
