function parse(input) {
  const lines = input.split("\n").map(line => line.split(""));
  const astroids = [];
  lines.forEach((line, y) => {
    line.forEach((point, x) => {
      if (point === "#") {
        astroids.push({ x, y });
      }
    });
  });
  return astroids;
}

function popBase(astroids) {
  astroids.forEach(base => {
    const angles = astroids
      .filter(x => x !== base)
      .map(target => calcAngle(base, target));
    base.count = new Set(angles).size;
  });
  return astroids.sort((a, b) => a.count - b.count).pop();
}

const calcAngle = (a, b) => (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;

export function part1(input) {
  return popBase(parse(input)).count;
}

export function part2(input) {
  const astroids = parse(input);
  const base = popBase(astroids);
  const angles = new Map();
  return astroids
    .map(target => ({
      score: target.x * 100 + target.y,
      angle: (calcAngle(base, target) + 270) % 360,
      distance: Math.abs(base.y - target.y) + Math.abs(base.x - target.x),
    }))
    .sort((a, b) => a.distance - b.distance)
    .map(target => {
      angles.set(target.angle, (angles.get(target.angle) || 0) + 1);
      return { ...target, round: angles.get(target.angle) };
    })
    .sort((a, b) => a.round - b.round || a.angle - b.angle)[199].score;
}
