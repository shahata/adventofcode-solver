function distance(a, b) {
  return a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0);
}

export function part1(input) {
  let constellations = 0;
  const lines = input.split('\n');
  const points = lines.map(line => line.split(',').map(x => +x));
  points.forEach(p => {
    p.near = points.filter(q => distance(p, q) <= 3);
  });
  while (points.length > 0) {
    const queue = [points.shift()];
    while (queue.length > 0) {
      queue.shift().near.forEach(p => {
        const idx = points.indexOf(p);
        if (idx !== -1) {
          queue.push(p);
          points.splice(idx, 1);
        }
      });
    }
    constellations++;
  }
  return constellations;
}

export const part2 = () => undefined;
