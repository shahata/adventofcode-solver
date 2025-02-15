function parse(input, length) {
  let regexp = /^(s|x|p)([^/]*)\/?([^/]*)$/;
  let rebuild = arr => [arr[0], arr[3], arr[2], arr[1], arr[4]].join("");
  let swap = (a, b) => new RegExp(`^(.{${a}})(.)(.{${b - a - 1}})(.)(.*)$`);
  let ops = {
    x: (str, regexp) => rebuild(str.match(regexp).slice(1)),
    p: (str, [a, b]) => {
      let [i, j] = [str.indexOf(a), str.indexOf(b)].sort((a, b) => a - b);
      return rebuild(str.match(swap(i, j)).slice(1));
    },
    s: (str, regexp) => str.match(regexp).slice(1).reverse().join(""),
  };
  let params = {
    x: (a, b) => swap(...[+a, +b].sort((a, b) => a - b)),
    p: (a, b) => [a, b],
    s: a => new RegExp(`^(.*)(.{${+a % length}})$`),
  };
  return input
    .split(",")
    .map(x => x.match(regexp).slice(1))
    .map(cmd => {
      let op = ops[cmd[0]];
      let args = params[cmd[0]](cmd[1], cmd[2]);
      return { op, args };
    });
}

function dance(order, commands) {
  return commands.reduce((x, { op, args }) => op(x, args), order);
}

export function part1(input, order = "abcdefghijklmnop") {
  return dance(order, parse(input, order.length));
}

export function part2(input, order = "abcdefghijklmnop", times = 1e9) {
  let commands = parse(input, order.length);
  let memory = {};
  let i;
  for (i = 0; i < times; i++) {
    if (memory[order]) {
      let loop = i - memory[order];
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
