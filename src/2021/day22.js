function overlaps(a, b) {
  return (
    a.x[0] < b.x[1] &&
    a.x[1] > b.x[0] &&
    a.y[0] < b.y[1] &&
    a.y[1] > b.y[0] &&
    a.z[0] < b.z[1] &&
    a.z[1] > b.z[0]
  );
}

function subtract(a, b) {
  const points = (d1, d2) => {
    const p = d2.filter(x => x > d1[0] && x < d1[1]);
    return [d1[0], ...p, d1[1]];
  };
  const xPoints = points(a.x, b.x);
  const yPoints = points(a.y, b.y);
  const zPoints = points(a.z, b.z);

  const areas = [];
  for (let i = 0; i < xPoints.length - 1; i++) {
    for (let j = 0; j < yPoints.length - 1; j++) {
      for (let k = 0; k < zPoints.length - 1; k++) {
        areas.push({
          x: xPoints.slice(i, i + 2),
          y: yPoints.slice(j, j + 2),
          z: zPoints.slice(k, k + 2),
        });
      }
    }
  }
  return areas.filter(x => !overlaps(x, b));
}

function calculateAreas(input) {
  const commands = input.split('\n').map(line => {
    const [operation, rest] = line.split(' ');
    let [x, y, z] = rest.split(',').map(x =>
      x
        .slice(2)
        .split('..')
        .map(x => +x)
        .sort((a, b) => a - b),
    );
    return {
      operation,
      x: [x[0], x[1] + 1],
      y: [y[0], y[1] + 1],
      z: [z[0], z[1] + 1],
    };
  });

  let areas = [];
  for (const command of commands) {
    areas = areas.flatMap(x =>
      overlaps(x, command) ? subtract(x, command) : [x],
    );
    if (command.operation === 'on') areas.push(command);
  }
  return areas;
}

export function part1(input) {
  const areas = calculateAreas(input);
  let total = 0;
  for (const area of areas) {
    const align = x => (x < -50 ? -50 : x > 51 ? 51 : x);
    const subset = {
      x: area.x.map(align),
      y: area.y.map(align),
      z: area.z.map(align),
    };
    if (
      subset.x[0] < subset.x[1] &&
      subset.y[0] < subset.y[1] &&
      subset.z[0] < subset.z[1]
    ) {
      total +=
        (subset.x[1] - subset.x[0]) *
        (subset.y[1] - subset.y[0]) *
        (subset.z[1] - subset.z[0]);
    }
  }
  return total;
}

export function part2(input) {
  const areas = calculateAreas(input);
  let total = 0;
  for (const area of areas) {
    total +=
      (area.x[1] - area.x[0]) *
      (area.y[1] - area.y[0]) *
      (area.z[1] - area.z[0]);
  }
  return total;
}
