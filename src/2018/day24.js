function parse(input) {
  let groups = [];
  let army;
  input.split("\n").forEach(line => {
    if (line === "Immune System:") {
      army = "Immune System";
    } else if (line === "Infection:") {
      army = "Infection";
    } else if (line.length > 0) {
      let [, units, hit, properties, attack, type, initiative] = line.match(
        /^(\d+) units each with (\d+) hit points(?: \(([^)]+)\))? with an attack that does (\d+) ([^\s]+) damage at initiative (\d+)$/,
      );
      let group = {
        army,
        units: +units,
        hit: +hit,
        immune: [],
        weak: [],
        attack: +attack,
        type,
        initiative: +initiative,
      };
      if (properties) {
        properties.split("; ").forEach(property => {
          let [type, kinds] = property.split(" to ");
          group[type].push(...kinds.split(", "));
        });
      }
      groups.push(group);
    }
  });
  return groups;
}

function effectiveSort(a, b) {
  return b.units * b.attack - a.units * a.attack || b.initiative - a.initiative;
}

function damage(attacking, defending) {
  if (defending.immune.includes(attacking.type)) {
    return 0;
  } else if (defending.weak.includes(attacking.type)) {
    return attacking.units * attacking.attack * 2;
  } else {
    return attacking.units * attacking.attack;
  }
}

function battle(groups) {
  while (groups.some(group => group.army !== groups[0].army)) {
    groups.sort(effectiveSort);
    let options = groups.slice(0);
    let fight = [];
    groups.forEach(attacking => {
      let selected = options
        .filter(option => option.army !== attacking.army)
        .map(option => ({ option, damage: damage(attacking, option) }))
        .sort(
          (a, b) => b.damage - a.damage || effectiveSort(a.option, b.option),
        )
        .shift();
      if (selected && selected.damage > 0) {
        let defending = selected.option;
        options.splice(options.indexOf(defending), 1);
        fight.push({ attacking, defending });
      }
    });
    fight.sort((a, b) => b.attacking.initiative - a.attacking.initiative);
    let totalKilled = 0;
    fight.forEach(({ attacking, defending }) => {
      if (attacking.units > 0) {
        let killed = Math.floor(damage(attacking, defending) / defending.hit);
        defending.units -= killed;
        totalKilled += killed;
        if (defending.units <= 0) {
          groups.splice(groups.indexOf(defending), 1);
        }
      }
    });
    if (totalKilled === 0) {
      return undefined;
    }
  }
  return groups;
}

export function part1(input) {
  let groups = parse(input);
  return battle(groups).reduce((sum, group) => sum + group.units, 0);
}

function attempt(input, i) {
  let groups = parse(input);
  let boost = groups.map(g => {
    if (g.army === "Immune System") {
      g.attack += i;
    }
    return g;
  });
  let result = battle(boost);
  return (
    result &&
    result[0].army === "Immune System" &&
    result.reduce((sum, group) => sum + group.units, 0)
  );
}

function binarySearch(cb) {
  let start = 0;
  let increment = 2 ** 10;
  while (increment > 4) {
    while (!cb(start)) {
      start += increment;
    }
    start -= increment;
    increment /= 2;
  }
  let end = start + increment * 2;
  for (let i = start; i <= end; i++) {
    if (cb(i)) {
      return cb(i);
    }
  }
}

export function part2(input) {
  return binarySearch(i => attempt(input, i));
}
