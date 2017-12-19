const md5 = require('md5');
const log = require('single-line-log').stdout;

function day(input) {
  let hash, bytes, count = 0;
  let password1 = '';
  const password2 = [];
  let index = -1;
  log('0%');
  while (count < 8) {
    do {
      index++;
      bytes = md5(input + index, {asBytes: true});
      /* eslint no-bitwise: "off" */
    } while (bytes[0] !== 0 || bytes[1] !== 0 || bytes[2] >> 4 !== 0);
    hash = md5(input + index);
    const i = parseInt(hash[5], 10);
    password1 += hash[5];
    if (i >= 0 && i <= 7 && !password2[i]) {
      password2[i] = hash[6];
      count++;
      log(`${Math.round(100 * count / 8)}%`);
    }
  }
  log('');
  const part1 = password1.slice(0, 8);
  const part2 = password2.join('');
  return [part1, part2];
}

module.exports = {day};
