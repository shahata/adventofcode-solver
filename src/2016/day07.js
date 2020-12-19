function ssl(ip) {
  return (
    ip.match(/(?:^|\])[^[\]]*(.)(?!\1)(.)\1.*\[[^\]]*\2\1\2/) ||
    ip.match(/\[[^\]]*(.)(?!\1)(.)\1.*\][^[]*\2\1\2/)
  );
}

function tls(ip) {
  return ip.match(/(.)(?!\1)(.)\2\1/) && !ip.match(/\[[^\]]*(.)(?!\1)(.)\2\1/);
}

export const part1 = input => input.split('\n').filter(tls).length;
export const part2 = input => input.split('\n').filter(ssl).length;
