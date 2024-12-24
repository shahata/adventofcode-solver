function positionAfter(p, v, a, t) {
  return p + (t * (2 * (v + a) + (t - 1) * a)) / 2;
}

export function particleAfter(particle, t) {
  let { i, p, v, a } = particle;
  let pAfter = p.map((x, i) => positionAfter(p[i], v[i], a[i], t));
  return { i, p: pAfter, v, a };
}

function byPosition(a, b) {
  if (a.p[0] < b.p[0]) {
    return -1;
  } else if (a.p[0] > b.p[0]) {
    return 1;
  } else if (a.p[1] < b.p[1]) {
    return -1;
  } else if (a.p[1] > b.p[1]) {
    return 1;
  } else if (a.p[2] < b.p[2]) {
    return -1;
  } else if (a.p[2] > b.p[2]) {
    return 1;
  } else {
    return 0;
  }
}

function findCollisions(particles) {
  let collide = (a, b) => b && a.p.every((x, i) => x === b.p[i]);
  return particles
    .sort(byPosition)
    .filter((x, i, a) => collide(x, a[i - 1]) || collide(x, a[i + 1]));
}

function parse(input) {
  return input.split("\n").map((line, i) => {
    let parser =
      /^p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>$/;
    let numbers = line.match(parser).slice(1).map(Number);
    return {
      i,
      p: numbers.slice(0, 3),
      v: numbers.slice(3, 6),
      a: numbers.slice(6, 9),
    };
  });
}

function closest(particles) {
  let distances = particles.map(
    x => Math.abs(x.p[0]) + Math.abs(x.p[1]) + Math.abs(x.p[2]),
  );
  let min = Math.min(...distances);
  return distances.indexOf(min);
}

function after(particles, t) {
  return particles.map(x => particleAfter(x, t));
}

export function part1(input) {
  let particles = after(parse(input), 1000);
  return closest(particles);
}

export function part2(input) {
  let particles = parse(input);
  for (let t = 0; t < 1000; t++) {
    let collisions = findCollisions(after(particles, t));
    collisions.forEach(x => delete particles[x.i]);
  }
  return particles.filter(x => x).length;
}
