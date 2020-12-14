export function part1(input) {
  const commands = input.split('\n').map(cmd => cmd.split(' = '));
  const map = {};
  let orMask, andMask;
  commands.forEach(([address, value]) => {
    if (address === 'mask') {
      orMask = BigInt(parseInt(value.replaceAll('X', '0'), 2));
      andMask = BigInt(parseInt(value.replaceAll('X', '1'), 2));
    } else {
      map[address] = Number((BigInt(+value) | orMask) & andMask);
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  const commands = input.split('\n').map(cmd => cmd.split(' = '));
  const map = {};
  let masks;
  commands.forEach(([address, value]) => {
    if (address === 'mask') {
      const floating = [...value.matchAll('X')].map(m => 35n - BigInt(m.index));
      const orMask = BigInt(parseInt(value.replaceAll('X', '0'), 2));
      masks = new Array(Math.pow(2, floating.length))
        .fill({ orMask, andMask: 0n })
        .map((x, i) => {
          return floating.reduce(({ orMask, andMask }, position, bit) => {
            if ((i >> bit) & 1) {
              return { orMask: orMask | (1n << position), andMask };
            } else {
              return { orMask, andMask: andMask | (1n << position) };
            }
          }, x);
        });
    } else {
      address = BigInt(+address.match(/\d+/).pop());
      masks.forEach(x => (map[(address | x.orMask) & ~x.andMask] = +value));
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}
