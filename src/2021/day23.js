import { PriorityQueue } from "@datastructures-js/priority-queue";

let toKey = state =>
  state
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map(s => `${s.x},${s.y},${s.sign}`)
    .join(":");

function neighbors({ state, energy: curr }) {
  let price = { A: 1, B: 10, C: 100, D: 1000 };
  let home = { A: 3, B: 5, C: 7, D: 9 };
  let move = (a, b) => ({
    state: state.map(m => (m !== a ? m : { ...b, done: b.y !== 1 })), //replace with new position
    energy: curr + price[a.sign] * (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)), //add cost of move
  });
  return state.flatMap(member => {
    let { x, y, sign } = member;
    let is = (x, y) => m => m.x === x && m.y === y;
    if (member.done) return []; //it is already in the right room
    if (y === 1) {
      //we want to bring it into the room
      let go = { sign, x: home[sign], y: state.length === 8 ? 3 : 5 }; //set different target y for part 1 and 2
      if (state.some(m => (m.x - x) * (m.x - go.x) < 0 && m.y === 1)) return []; //the path to the room is blocked
      if (state.some(m => m.x === go.x && m.sign !== sign)) return []; //there's a wrong letter in the room
      while (state.some(is(go.x, go.y))) go.y--; //search for the lowest free space in the room
      return [move(member, go)]; //move into the room
    } else {
      //we want to bring it out of the room
      let options = [];
      if (state.some(m => m.x === x && m.y < y)) return []; //the path out of the room is blocked
      for (let i = x; i >= 1 && !state.some(is(i, 1)); i--) options.push(i); //collect options to the left
      for (let i = x; i <= 11 && !state.some(is(i, 1)); i++) options.push(i); //collect options to the right
      options = options.filter(i => ![3, 5, 7, 9].includes(i)); //don't stand in the doorway don't block up the hall
      return options.map(x => move(member, { sign, x, y: 1 })); //return all remaining options to move out of the room
    }
  });
}

function solve(start, end) {
  let visited = new Map();
  let queue = new PriorityQueue(
    (a, b) => a.energy - b.energy,
    [{ state: start, energy: 0 }],
  );
  while (queue.size() > 0) {
    let n = queue.dequeue();
    if (toKey(n.state) === end) return n.energy;
    neighbors(n).forEach(neighbor => {
      let v = visited.get(toKey(neighbor.state));
      if (!v || neighbor.energy < v.energy) {
        if (v) queue.remove(x => x === v);
        visited.set(toKey(neighbor.state), neighbor);
        queue.enqueue(neighbor);
      }
    });
  }
}

function parse(input) {
  let maze = input.map(line => line.split(""));
  let state = [];
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
  "#############",
  "#...........#",
  "###A#B#C#D###",
  "  #A#B#C#D#",
  "  #########",
];

export function part1(input) {
  return solve(parse(input.split("\n")), toKey(parse(solved)));
}

export function part2(input) {
  let solved2 = solved.slice(0);
  input = input.split("\n");
  input.splice(3, 0, "  #D#C#B#A#", "  #D#B#A#C#");
  solved2.splice(3, 0, "  #A#B#C#D#", "  #A#B#C#D#");
  return solve(parse(input), toKey(parse(solved2)));
}
