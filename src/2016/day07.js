function ssl(ip) {
  return (
    ip.match(/(?:^|\])[^[\]]*(.)(?!\1)(.)\1.*\[[^\]]*\2\1\2/) ||
    ip.match(/\[[^\]]*(.)(?!\1)(.)\1.*\][^[]*\2\1\2/)
  );
}

function tls(ip) {
  return ip.match(/(.)(?!\1)(.)\2\1/) && !ip.match(/\[[^\]]*(.)(?!\1)(.)\2\1/);
}

export function part1(input) {
  return input.split('\n').filter(tls).length;
}

export function part2(input) {
  return input.split('\n').filter(ssl).length;
}
