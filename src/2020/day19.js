function parse(rules) {
  const map = new Map();
  rules.forEach(x => {
    const [id, str] = x.split(': ');
    map.set(id, str);
  });
  let pattern = map.get('0');
  while (pattern.match(/\d+(?!})/)) {
    pattern = pattern.replace(/\d+(?!})/g, x => `( ${map.get(x)} )`);
  }
  pattern = pattern.replaceAll(' ', '').replaceAll(/\("([^"]*)"\)/g, '$1');
  return new RegExp(`^${pattern}$`);
}

export function part1(input) {
  const [rules, messages] = input.split('\n\n').map(x => x.split('\n'));
  return messages.filter(message => message.match(parse(rules))).length;
}

export function part2(input) {
  input = input
    .replace('8: 42', '8: 42 +')
    .replace(
      '11: 42 31',
      '11: 42 {1} 31 {1} | 42 {2} 31 {2} | 42 {3} 31 {3} | 42 {4} 31 {4} | 42 {5} 31 {5} | 42 {6} 31 {6}',
    );
  return part1(input);
}
