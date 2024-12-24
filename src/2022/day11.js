export function part1(input, count = 20) {
  let monkeys = input.split("\n\n").map(monkey => {
    let lines = monkey.split("\n");
    let [, items] = lines[1].split(": ");
    let [safe] = lines[2].match(/(old|\d+) (\*|\+) (old|\d+)$/);
    return {
      items: items.split(", ").map(x => +x),
      operation: new Function("old", `return ${safe}`),
      divisible: +lines[3].match(/\d+$/)[0],
      yes: +lines[4].match(/\d+$/)[0],
      no: +lines[5].match(/\d+$/)[0],
      business: 0,
    };
  });
  let base = monkeys.reduce((prev, monkey) => prev * monkey.divisible, 1);
  for (let i = 0; i < count; i++) {
    for (let monkey of monkeys) {
      while (monkey.items.length > 0) {
        let worry = monkey.operation(monkey.items.shift());
        worry = count > 20 ? worry % base : Math.floor(worry / 3);
        let target = worry % monkey.divisible === 0 ? monkey.yes : monkey.no;
        monkeys[target].items.push(worry);
        monkey.business++;
      }
    }
  }
  let [top1, top2] = monkeys.sort((a, b) => b.business - a.business);
  return top1.business * top2.business;
}

export function part2(input) {
  return part1(input, 10000);
}
