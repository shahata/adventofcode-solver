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
  let points = (d1, d2) => {
    let p = d2.filter(x => x > d1[0] && x < d1[1]);
    return [d1[0], ...p, d1[1]];
  };
  let xPoints = points(a.x, b.x);
  let yPoints = points(a.y, b.y);
  let zPoints = points(a.z, b.z);

  let areas = [];
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
  let commands = input.split("\n").map(line => {
    let [operation, rest] = line.split(" ");
    let [x, y, z] = rest
      .split(",")
      .map(x => x.slice(2).split("..").map(Number));
    return {
      operation,
      x: [x[0], x[1] + 1],
      y: [y[0], y[1] + 1],
      z: [z[0], z[1] + 1],
    };
  });

  let areas = [];
  for (let command of commands) {
    areas = areas.flatMap(x =>
      overlaps(x, command) ? subtract(x, command) : [x],
    );
    if (command.operation === "on") areas.push(command);
  }
  return areas;
}

function volume(areas) {
  let total = 0;
  for (let { x, y, z } of areas) {
    total += (x[1] - x[0]) * (y[1] - y[0]) * (z[1] - z[0]);
  }
  return total;
}

export function part1(input) {
  let areas = calculateAreas(input);
  let rest = calculateAreas(`${input}\noff x=-50..50,y=-50..50,z=-50..50`);
  return volume(areas) - volume(rest);
}

export function part2(input) {
  let areas = calculateAreas(input);
  return volume(areas);
}
