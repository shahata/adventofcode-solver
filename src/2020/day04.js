function solve(input, validations) {
  let passports = input
    .split("\n\n")
    .map(x =>
      x
        .split(/[\n\s]/)
        .reduce(
          (obj, f) => ({ ...obj, [f.split(":")[0]]: f.split(":")[1] }),
          {},
        ),
    );
  return passports.filter(x => {
    return Object.keys(validations).every(key => validations[key](x[key]));
  }).length;
}

export function part1(input) {
  let validations = {
    byr: n => !!n,
    iyr: n => !!n,
    eyr: n => !!n,
    hgt: n => !!n,
    hcl: n => !!n,
    ecl: n => !!n,
    pid: n => !!n,
  };
  return solve(input, validations);
}

export function part2(input) {
  let validations = {
    byr: n => n && n.length === 4 && +n >= 1920 && +n <= 2002,
    iyr: n => n && n.length === 4 && +n >= 2010 && +n <= 2020,
    eyr: n => n && n.length === 4 && +n >= 2020 && +n <= 2030,
    hgt: n => {
      let m = n && n.match(/^(\d+)(cm|in)$/);
      return (
        m &&
        ((m[2] === "cm" && +m[1] >= 150 && +m[1] <= 193) ||
          (m[2] === "in" && +m[1] >= 59 && +m[1] <= 76))
      );
    },
    hcl: n => n && !!n.match(/^#[0-9a-f]{6}$/),
    ecl: n => n && "amb blu brn gry grn hzl oth".split(" ").includes(n),
    pid: n => n && !!n.match(/^[0-9]{9}$/),
  };
  return solve(input, validations);
}
