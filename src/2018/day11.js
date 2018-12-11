function powerLevel({ x, y }, serial) {
  const rackId = x + 10;
  const mul = (rackId * y + serial) * rackId;
  return Math.floor((mul % 1000) / 100) - 5;
}

function calc(serial, size, state) {
  debugger;
  const results = new Map();
  results.set(state.max.point, state.max);
  for (let x = 0; x < 300 - (size - 1); x++) {
    for (let y = 0; y < 300 - (size - 1); y++) {
      let { sum } = state.results.get(`${x},${y},${size - 1}`) || { sum: 0 };
      for (let i = size - 1; i < size; i++) {
        for (let j = 0; j < size; j++) {
          sum += powerLevel({ x: x + i, y: y + j }, serial);
        }
      }
      for (let i = 0; i < size; i++) {
        for (let j = size - 1; j < size; j++) {
          sum += powerLevel({ x: x + i, y: y + j }, serial);
        }
      }
      sum -= powerLevel({ x: x + size - 1, y: y + size - 1 }, serial);
      results.set(`${x},${y},${size}`, { point: `${x},${y},${size}`, sum });
    }
  }
  return {
    results,
    max: Array.from(results.values())
      .sort((a, b) => a.sum - b.sum)
      .pop(),
  };
}

function part1(input) {
  const serial = parseInt(input);
  let state = { results: new Map(), max: { sum: -Infinity } };
  state = calc(serial, 1, { ...state, max: { sum: -Infinity } });
  state = calc(serial, 2, { ...state, max: { sum: -Infinity } });
  state = calc(serial, 3, { ...state, max: { sum: -Infinity } });
  return state.max.point.replace(/,3$/, '');
}

function part2(input) {
  const serial = parseInt(input);
  let state = { results: new Map(), max: { sum: -Infinity } };
  for (let i = 1; i <= 300; i++) {
    // console.log(i);
    state = calc(serial, i, state);
  }
  return state.max.point;
}

module.exports = { part1, part2 };
