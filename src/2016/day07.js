import { lines } from '../utils/commons.js';

function ssl(ip) {
  return (
    ip.match(/(?:^|\])[^[\]]*(.)(?!\1)(.)\1.*\[[^\]]*\2\1\2/) ||
    ip.match(/\[[^\]]*(.)(?!\1)(.)\1.*\][^[]*\2\1\2/)
  );
}

function tls(ip) {
  return ip.match(/(.)(?!\1)(.)\2\1/) && !ip.match(/\[[^\]]*(.)(?!\1)(.)\2\1/);
}

export const part1 = input => lines(input).filter(tls).length;
export const part2 = input => lines(input).filter(ssl).length;
