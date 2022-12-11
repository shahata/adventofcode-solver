export function part1(input, count = 20) {
  let monkeys = input.split('\n\n');
  monkeys = monkeys.map(monkey => {
    const lines = monkey.split('\n');
    const [, items] = lines[1].split(': ');
    const [safe] = lines[2].match(/(old|\d+) (\*|\+) (old|\d+)$/);
    return {
      items: items.split(', ').map(x => +x),
      operation: new Function('old', `return ${safe}`),
      divisible: +lines[3].match(/\d+$/)[0],
      yes: +lines[4].match(/\d+$/)[0],
      no: +lines[5].match(/\d+$/)[0],
      business: 0,
    };
  });
  const base = monkeys.reduce((prev, monkey) => prev * monkey.divisible, 1);
  for (let i = 0; i < count; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        let worry = monkey.operation(monkey.items.shift());
        worry = count > 20 ? worry % base : Math.floor(worry / 3);
        const target = worry % monkey.divisible === 0 ? monkey.yes : monkey.no;
        monkeys[target].items.push(worry);
        monkey.business++;
      }
    }
  }
  monkeys = monkeys.sort((a, b) => b.business - a.business);
  return monkeys[0].business * monkeys[1].business;
}

export function part2(input) {
  return part1(input, 10000);
}
