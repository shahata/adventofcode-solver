function parse(input) {
  return input
    .split('\n')
    .map(x => x.match(/fly (\d+) km\/s .* (\d+) sec.* rest .* (\d+) sec/))
    .map(x => ({
      speed: parseInt(x[1], 10),
      fly: parseInt(x[2], 10),
      rest: parseInt(x[3], 10),
      distance: 0,
      points: 0,
    }));
}

function run(race, seconds) {
  for (let i = 0; i < seconds; i++) {
    race = race.map(x => {
      const ran = i % (x.fly + x.rest) < x.fly;
      x.distance += ran ? x.speed : 0;
      return x;
    });

    const lead = race.reduce((prev, x) => Math.max(prev, x.distance), 0);
    race.filter(x => x.distance === lead).forEach(x => x.points++);
  }
  return race;
}

function part1(input, seconds = 2503) {
  const race = run(parse(input), seconds);
  return race.reduce((prev, x) => Math.max(prev, x.distance), 0);
}

function part2(input, seconds = 2503) {
  const race = run(parse(input), seconds);
  return race.reduce((prev, x) => Math.max(prev, x.points), 0);
}

module.exports = { part1, part2 };
