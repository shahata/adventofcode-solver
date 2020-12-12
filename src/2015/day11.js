const abc = 'abcdefghijklmnopqrstuvwxyz';
const subStrings = abc
  .split('')
  .map((x, i) => abc.substr(i, 3))
  .filter(x => x.length === 3);

function ok(s) {
  return (
    s.match(/^[a-z]*$/) &&
    s.match(/^[^iol]*$/) &&
    s.match(/(.)\1.*(.)\2/) &&
    subStrings.some(sub => s.indexOf(sub) > -1)
  );
}

function next(password) {
  let s = parseInt(password, 36);
  do {
    s++;
  } while (!ok(s.toString(36)));
  return s.toString(36);
}

export const part1 = input => next(input);
export const part2 = input => next(next(input));
