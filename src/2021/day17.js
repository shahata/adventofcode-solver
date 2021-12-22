function shoot(xVelocity, yVelocity, xRange, yRange) {
  let x = 0;
  let y = 0;
  let maxY = 0;
  while (x < xRange[1] && y > yRange[0]) {
    x += xVelocity;
    y += yVelocity;
    maxY = Math.max(maxY, y);
    if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
      return maxY;
    }
    xVelocity = Math.max(0, xVelocity - 1);
    yVelocity--;
  }
}

function calculate(input) {
  const [xRange, yRange] = input
    .split(', ')
    .map(x => x.split('=').pop().split('..').map(Number));
  const deepY = Math.min(...yRange);
  const farX = Math.max(...xRange);
  let results = [];
  for (let xVelocity = 0; xVelocity <= farX; xVelocity++) {
    for (let yVelocity = deepY; yVelocity <= Math.abs(deepY); yVelocity++) {
      const maxY = shoot(xVelocity, yVelocity, xRange, yRange);
      if (maxY !== undefined) results.push(maxY);
    }
  }
  return results;
}

export function part1(input) {
  return Math.max(...calculate(input));
}

export function part2(input) {
  return calculate(input).length;
}
