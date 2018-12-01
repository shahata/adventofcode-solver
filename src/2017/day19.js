function parse(input) {
  return input.split('\n').map(line => line.split(''));
}

function findEntryPoint(route) {
  return { x: route[0].indexOf('|'), y: 0 };
}

function next({ x, y }, direction) {
  switch (direction) {
    case 'down':
      return { x, y: y + 1 };
    case 'up':
      return { x, y: y - 1 };
    case 'left':
      return { x: x - 1, y };
    case 'right':
      return { x: x + 1, y };
    default:
      return { x, y };
  }
}

function valueAt(route, { x, y }) {
  return route[y] && route[y][x];
}

function walk(route) {
  const state = {
    point: findEntryPoint(route),
    direction: 'down',
    message: '',
    steps: 0,
  };
  while (state.direction !== 'done') {
    if (valueAt(route, state.point) === '+') {
      if (state.direction === 'down' || state.direction === 'up') {
        if (
          !['.', ' ', '|'].includes(valueAt(route, next(state.point, 'right')))
        ) {
          state.direction = 'right';
        } else if (
          !['.', ' ', '|'].includes(valueAt(route, next(state.point, 'left')))
        ) {
          state.direction = 'left';
        } else {
          state.direction = 'done';
        }
      } else if (
        !['.', ' ', '-'].includes(valueAt(route, next(state.point, 'up')))
      ) {
        state.direction = 'up';
      } else if (
        !['.', ' ', '-'].includes(valueAt(route, next(state.point, 'down')))
      ) {
        state.direction = 'down';
      } else {
        state.direction = 'done';
      }
    }
    if (!['.', ' ', '|', '-', '+'].includes(valueAt(route, state.point))) {
      state.message += valueAt(route, state.point);
    }
    if (
      ['.', ' ', undefined].includes(
        valueAt(route, next(state.point, state.direction)),
      )
    ) {
      state.direction = 'done';
    }
    state.point = next(state.point, state.direction);
    state.steps++;
  }
  return state;
}

function part1(input) {
  return walk(parse(input)).message;
}

function part2(input) {
  return walk(parse(input)).steps;
}

module.exports = { part1, part2 };
