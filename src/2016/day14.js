const md5 = require('md5');
const log = require('single-line-log').stdout;

function findRepeatingCharacters(str, num) {
  return (str.match(new RegExp(`(.)\\1{${num - 1}}`, 'g')) || []).map(x => x[0]);
}

function generateKeys(input, hashFn) {
  const keys = [], window = [], characters = {};
  for (let i = 0; keys.length < 64; i++) {
    log(`${Math.round(100 * keys.length / 64)}%`);
    const str = hashFn(`${input}${i}`);
    findRepeatingCharacters(str, 5).forEach(x => characters[x] = (characters[x] || []).concat([i]));
    if (i >= 1000) {
      const digit = findRepeatingCharacters(window.shift(), 3).shift();
      const index = digit !== undefined && characters[digit] && characters[digit].find(x => x > i - 1000);
      if (index) {
        keys.push(i - 1000);
      }
    }
    window.push(str);
  }
  log('');
  return keys;
}

function md5times(str, count) {
  while (count > 0) {
    str = md5(str);
    count--;
  }
  return str;
}

function day(input) {
  const part1 = generateKeys(input, x => md5times(x, 1)).pop();
  const part2 = generateKeys(input, x => md5times(x, 2017)).pop();
  return [part1, part2];
}

module.exports = {day};
