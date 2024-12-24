function parse(input) {
  return input.split("\n").map(line => line.split(""));
}

function findEntryPoint(route) {
  return { x: route[0].indexOf("|"), y: 0 };
}

let next = {
  down: ({ x, y }) => ({ x, y: y + 1 }),
  up: ({ x, y }) => ({ x, y: y - 1 }),
  left: ({ x, y }) => ({ x: x - 1, y }),
  right: ({ x, y }) => ({ x: x + 1, y }),
};

function valueAt(route, { x, y }) {
  return route[y] && route[y][x];
}

function road(value, direction) {
  let roads = { right: "|", left: "|", up: "-", down: "-" };
  return ![".", " ", undefined, roads[direction]].includes(value);
}

function walk(route) {
  let state = {
    point: findEntryPoint(route),
    direction: "down",
    message: "",
    steps: 0,
  };
  while (state.direction !== "done") {
    if (valueAt(route, state.point) === "+") {
      if (state.direction === "down" || state.direction === "up") {
        if (road(valueAt(route, next.right(state.point)), "right")) {
          state.direction = "right";
        } else {
          state.direction = "left";
        }
      } else {
        if (road(valueAt(route, next.up(state.point)), "up")) {
          state.direction = "up";
        } else {
          state.direction = "down";
        }
      }
    }
    if (valueAt(route, state.point).match(/[A-Z]/)) {
      state.message += valueAt(route, state.point);
    }
    if (!road(valueAt(route, next[state.direction](state.point)))) {
      state.direction = "done";
    } else {
      state.point = next[state.direction](state.point);
    }
    state.steps++;
  }
  return state;
}

export function part1(input) {
  return walk(parse(input)).message;
}

export function part2(input) {
  return walk(parse(input)).steps;
}
