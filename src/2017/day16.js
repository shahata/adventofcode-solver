function parse(input, length) {
  const regexp = /^(s|x|p)([^/]*)\/?([^/]*)$/;
  const rebuild = arr => [arr[0], arr[3], arr[2], arr[1], arr[4]].join('');
  const swap = (a, b) => new RegExp(`^(.{${a}})(.)(.{${b - a - 1}})(.)(.*)$`);
  const ops = {
    x: (str, regexp) => rebuild(str.match(regexp).slice(1)),
    p: (str, [a, b]) => {
      const [i, j] = [str.indexOf(a), str.indexOf(b)].sort((a, b) => a - b);
      return rebuild(str.match(swap(i, j)).slice(1));
    },
    s: (str, regexp) => str.match(regexp).slice(1).reverse().join('')
  };
  const params = {
    x: (a, b) => swap(...[parseInt(a, 10), parseInt(b, 10)].sort((a, b) => a - b)),
    p: (a, b) => [a, b],
    s: a => new RegExp(`^(.*)(.{${parseInt(a, 10) % length}})$`)
  };
  return input.split(',').map(x => x.match(regexp).slice(1)).map(cmd => {
    const op = ops[cmd[0]];
    const args = params[cmd[0]](cmd[1], cmd[2]);
    return {op, args};
  });
}

function dance(order, commands) {
  return commands.reduce((x, {op, args}) => op(x, args), order);
}

function part1(input, order = 'abcdefghijklmnop') {
  return dance(order, parse(input, order.length));
}

function part2(input, order = 'abcdefghijklmnop', times = 1000 * 1000 * 1000) {
  const commands = parse(input, order.length);
  const memory = {};
  let i;
  for (i = 0; i < times; i++) {
    if (memory[order]) {
      const loop = i - memory[order];
      i += times - (times % loop);
      while (i > times - 1) {
        i -= loop;
      }
    } else {
      memory[order] = i;
    }
    order = dance(order, commands);
  }
  return order;
}

module.exports = {part1, part2};
