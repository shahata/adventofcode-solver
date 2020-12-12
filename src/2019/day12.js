function parse(input) {
  return input
    .split('\n')
    .map(s =>
      s
        .match(/<x=([^,]*), y=([^,]*), z=([^>]*)>/)
        .slice(1)
        .map(x => +x),
    )
    .map(([x, y, z]) => ({
      position: [x, y, z],
      velocity: [0, 0, 0],
    }));
}

function rotate(moons) {
  moons.forEach(moon => {
    moons.forEach(moon2 => {
      moon.position.forEach((x, i) => {
        if (moon2.position[i] > moon.position[i]) {
          moon.velocity[i]++;
        }
        if (moon2.position[i] < moon.position[i]) {
          moon.velocity[i]--;
        }
      });
    });
  });
  moons.forEach(moon => {
    moon.position.forEach((x, i) => {
      moon.position[i] += moon.velocity[i];
    });
  });
}

//lcm = a*b/gcd(a,b)
function lcm(...args) {
  return args
    .map(x => Math.abs(x))
    .reduce((a, b) => {
      const m = a * b;
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return m / a;
    });
}

export function part1(input, rotations = 1000) {
  const moons = parse(input);
  for (let i = 0; i < rotations; i++) {
    rotate(moons);
  }
  return moons.reduce((sum, moon) => {
    const sum1 = moon.position.reduce((a, b) => Math.abs(a) + Math.abs(b));
    const sum2 = moon.velocity.reduce((a, b) => Math.abs(a) + Math.abs(b));
    return sum + sum1 * sum2;
  }, 0);
}

export function part2(input) {
  const moons = parse(input);
  const history = [new Set(), new Set(), new Set()];
  for (let i = 0; i < Infinity; i++) {
    rotate(moons);
    history.forEach((h, axis) => {
      if (h.size === i) {
        const s = JSON.stringify([
          moons.map(m => m.position[axis]),
          moons.map(m => m.velocity[axis]),
        ]);
        h.add(s);
      }
    });
    if (history.every(h => h.size <= i)) {
      return lcm(...history.map(h => h.size));
    }
  }
}
