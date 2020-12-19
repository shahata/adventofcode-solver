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
  const rule = new Array(10).fill().map((x, i) => `42{${i + 1}} 31{${i + 1}}`);
  input = input
    .replace('8: 42', '8: 42+')
    .replace('11: 42 31', `11: ${rule.join(' | ')}`);
  return part1(input);
}
