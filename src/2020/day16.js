function parse(input) {
  let [rules, ticket, tickets] = input.split('\n\n');
  rules = rules
    .split('\n')
    .map(x => x.match(/^(.*): (\d+)-(\d+) or (\d+)-(\d+)$/))
    .map(([, field, a, b, c, d]) => ({ field, a: +a, b: +b, c: +c, d: +d }));

  ticket = ticket.split('\n').pop();

  tickets = tickets
    .split('\n')
    .slice(1)
    .concat([ticket])
    .map(x => x.split(',').map(Number));

  return { rules, ticket: tickets.at(-1), tickets };
}

const valid = (n, x) => (n >= x.a && n <= x.b) || (n >= x.c && n <= x.d);

function validate(ticket, rules) {
  return ticket.reduce((error, n) => {
    return error + (rules.every(x => !valid(n, x)) ? n : 0);
  }, 0);
}

export function part1(input) {
  const { rules, tickets } = parse(input);
  return tickets.map(x => validate(x, rules)).reduce((a, b) => a + b);
}

export function part2(input) {
  let { rules, ticket, tickets } = parse(input);
  tickets = tickets.filter(ticket =>
    ticket.every(n => rules.some(x => valid(n, x))),
  );

  let remaining = ticket.map((x, i) => i);
  while (remaining.length > 0) {
    rules
      .filter(x => x.position === undefined)
      .forEach(x => {
        const found = remaining.filter(i => tickets.every(t => valid(t[i], x)));
        if (found.length === 1) {
          x.position = found.pop();
          x.value = ticket[x.position];
          remaining = remaining.filter(i => i !== x.position);
        }
      });
  }

  return rules
    .filter(x => x.field.startsWith('departure'))
    .sort((a, b) => a.position - b.position)
    .reduce((mul, x) => mul * x.value, 1);
}
