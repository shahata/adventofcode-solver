function parse(input) {
  return input.split('\n').map(line => {
    let [color, content] = line.split(' contain ');
    color = color.replace(/ bags?\.?/, '');
    content = content.split(', ').map(x => x.replace(/ bags?\.?/, ''));
    content = content
      .filter(x => x !== 'no other')
      .map(x => {
        const [, count, color] = x.match(/^(\d+) (.*)$/);
        return { color, count: +count };
      });
    return { color, content };
  });
}

function walk1(graph, color, total) {
  if (graph[color]) {
    graph[color].forEach(c => {
      total.push(c);
      walk1(graph, c, total);
    });
  }
}

export function part1(input) {
  const bags = parse(input);
  const graph = {};
  bags.forEach(bag => {
    bag.content.forEach(({ color }) => {
      graph[color] = (graph[color] || []).concat(bag.color);
    });
  });
  const total = [];
  walk1(graph, 'shiny gold', total);
  return new Set(total).size;
}

function walk2(graph, color) {
  return graph[color].reduce((sum, bag) => {
    return sum + bag.count * walk2(graph, bag.color);
  }, 1);
}

export function part2(input) {
  const bags = parse(input);
  const graph = {};
  bags.forEach(bag => (graph[bag.color] = bag.content));
  return walk2(graph, 'shiny gold') - 1;
}
