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
    .map(x => x.split(',').map(x => +x));

  return { rules, ticket: tickets[tickets.length - 1], tickets };
}

const valid = (n, x) => (n >= x.a && n <= x.b) || (n >= x.c && n <= x.d);

function validate(ticket, rules) {
  return ticket.reduce((error, n) => {
    return error + (rules.every(x => !valid(n, x)) ? n : 0);
  }, 0);
}

export function part1(input) {
  let { rules, tickets } = parse(input);
  return tickets.map(x => validate(x, rules)).reduce((a, b) => a + b);
}

export function part2(input) {
  let { rules, ticket, tickets } = parse(input);
  tickets = tickets.filter(ticket =>
    ticket.every(n => rules.some(x => valid(n, x))),
  );

  const done = [];
  while (done.length < ticket.length) {
    rules
      .filter(x => x.position === undefined)
      .forEach(x => {
        const found = [];
        for (let i = 0; i < ticket.length; i++) {
          if (!done.includes(i) && tickets.every(t => valid(t[i], x))) {
            found.push(i);
          }
        }
        if (found.length === 1) {
          x.position = found[0];
          done.push(x.position);
        }
      });
  }

  return rules
    .sort((a, b) => a.position - b.position)
    .map((x, i) => ({ ...x, value: ticket[i] }))
    .filter(x => x.field.startsWith('departure'))
    .reduce((mul, x) => mul * x.value, 1);
}
