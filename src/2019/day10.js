function parse(input) {
  const lines = input.split('\n').map(line => line.split(''));
  const astroids = [];
  lines.forEach((line, y) => {
    line.forEach((point, x) => {
      if (point === '#') {
        astroids.push({ x, y });
      }
    });
  });
  return astroids;
}

function bestBase(astroids) {
  astroids.map(astroid => {
    astroid.m = new Set();
    astroids.forEach(point => {
      if (astroid !== point) {
        astroid.m.add(Math.atan2(point.y - astroid.y, point.x - astroid.x));
      }
    });
  });
  const max = Math.max(...astroids.map(astroid => astroid.m.size));
  return astroids.find(x => x.m.size === max);
}

export function part1(input) {
  const astroids = parse(input);
  return bestBase(astroids).m.size;
}

export function part2(input) {
  const astroids = parse(input);
  const base = bestBase(astroids);
  const targets = astroids.filter(a => a !== base);
  targets.forEach(target => {
    target.angle =
      (Math.atan2(base.y - target.y, base.x - target.x) * 180) / Math.PI;
    target.angle = (target.angle + 360) % 360;
    target.distance = Math.abs(base.y - target.y) + Math.abs(base.x - target.x);
  });

  const killed = [];
  let angle = 90;
  while (killed.length !== 200) {
    const results = targets
      .filter(t => t.angle - angle >= 0)
      .sort((a, b) => a.angle - b.angle);
    const next = results
      .filter(t => t.angle === results[0].angle)
      .sort((a, b) => a.distance - b.distance)
      .shift();
    targets.splice(targets.indexOf(next), 1);
    killed.push(next);

    ({ angle } = targets
      .filter(t => t.angle - angle > 0)
      .sort((a, b) => a.angle - b.angle)
      .shift() || { angle: 0 });
  }
  return killed[killed.length - 1].x * 100 + killed[killed.length - 1].y;
}
