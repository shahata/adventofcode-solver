function parse(rules) {
  const map = new Map();
  rules.forEach(x => {
    const [id, str] = x.split(": ");
    map.set(id, str);
  });
  let pattern = map.get("0");
  while (pattern.match(/\d+(?!})/)) {
    pattern = pattern.replace(/\d+(?!})/g, x => `(${map.get(x)})`);
  }
  pattern = pattern.replace(/\("([^"]*)"\)/g, "$1").replace(/[\s"]/g, "");
  return new RegExp(`^${pattern}$`);
}

export function part1(input) {
  const [rules, messages] = input.split("\n\n").map(x => x.split("\n"));
  const pattern = parse(rules);
  return messages.filter(message => message.match(pattern)).length;
}

export function part2(input) {
  const rule = new Array(10).fill().map((x, i) => `42{${i + 1}} 31{${i + 1}}`);
  input = input
    .replace(/^8: 42$/m, "8: 42+")
    .replace(/^11: 42 31$/m, `11: ${rule.join("|")}`);
  return part1(input);
}
