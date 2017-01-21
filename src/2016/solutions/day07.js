'use strict';

function ssl(ip) {
  return ip.match(/(?:^|\])[^[\]]*(.)(?!\1)(.)\1.*\[[^\]]*\2\1\2/) ||
         ip.match(/\[[^\]]*(.)(?!\1)(.)\1.*\][^[]*\2\1\2/);
}

function tls(ip) {
  return ip.match(/(.)(?!\1)(.)\2\1/) && !ip.match(/\[[^\]]*(.)(?!\1)(.)\2\1/);
}

function day(input) {
  const part1 = input.split('\n').filter(tls).length;
  const part2 = input.split('\n').filter(ssl).length;
  return [part1, part2];
}

module.exports = day;
