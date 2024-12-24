function inc(octopai, i, j) {
  if (octopai[i] !== undefined && octopai[i][j] !== undefined) {
    octopai[i][j]++;
    if (octopai[i][j] === 10) {
      inc(octopai, i - 1, j - 1);
      inc(octopai, i - 1, j + 0);
      inc(octopai, i - 1, j + 1);
      inc(octopai, i + 0, j - 1);
      inc(octopai, i + 0, j + 1);
      inc(octopai, i + 1, j - 1);
      inc(octopai, i + 1, j + 0);
      inc(octopai, i + 1, j + 1);
    }
  }
}

function run(input, steps) {
  let octopai = input.split("\n").map(line => line.split("").map(Number));
  let flashes = 0;
  for (let n = 0; n < steps; n++) {
    if (octopai.every(line => line.every(octopus => octopus === 0))) {
      return n;
    }
    octopai.forEach((l, i) => l.forEach((o, j) => inc(octopai, i, j)));
    octopai.forEach((l, i) =>
      l.forEach((o, j) => o > 9 && ++flashes && (octopai[i][j] = 0)),
    );
  }
  return flashes;
}

export function part1(input) {
  return run(input, 100);
}

export function part2(input) {
  return run(input, Infinity);
}
