function powerLevel({ x, y }, serial) {
  const rackId = x + 10;
  const mul = (rackId * y + serial) * rackId;
  return Math.floor((mul % 1000) / 100) - 5;
}

function calc(serial, size, state) {
  const results = new Map();
  const lines = new Map();
  for (let x = 0; x < 300 - (size - 1); x++) {
    for (let y = 0; y < 300 - (size - 1); y++) {
      let { sum } = state.results.get(`${x},${y},${size - 1}`) || { sum: 0 };
      const l1 = state.lines.get(`${x}-${x + size - 2},${y + size - 1}`) || 0;
      const l2 = state.lines.get(`${x + size - 1},${y}-${y + size - 2}`) || 0;
      const corner = powerLevel({ x: x + size - 1, y: y + size - 1 }, serial);
      lines.set(`${x}-${x + size - 1},${y + size - 1}`, l1 + corner);
      lines.set(`${x + size - 1},${y}-${y + size - 1}`, l2 + corner);
      sum += l1 + l2 + corner;
      results.set(`${x},${y},${size}`, { point: `${x},${y},${size}`, sum });
    }
  }
  const values = Array.from(results.values()).concat(state.max);
  return {
    results,
    lines,
    max: values.sort((a, b) => a.sum - b.sum).pop(),
  };
}

export function part1(input) {
  const serial = +input;
  let state = { results: new Map(), lines: new Map(), max: { sum: -Infinity } };
  state = calc(serial, 1, { ...state, max: { sum: -Infinity } });
  state = calc(serial, 2, { ...state, max: { sum: -Infinity } });
  state = calc(serial, 3, { ...state, max: { sum: -Infinity } });
  return state.max.point.replace(/,3$/, '');
}

export function part2(input) {
  const serial = +input;
  let state = { results: new Map(), lines: new Map(), max: { sum: -Infinity } };
  for (let i = 1; i <= 300; i++) {
    state = calc(serial, i, state);
  }
  return state.max.point;
}
