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
      const floating = [...value.matchAll('X')].map(({ index }) => 35 - index);
      const orMask = BigInt(parseInt(value.replaceAll('X', '0'), 2));
      masks = new Array(Math.pow(2, floating.length)).fill().map((x, i) => {
        return floating.reduce(
          ({ orMask, andMask }, x, bit) => {
            if ((i >> bit) & 1) {
              return { orMask: orMask | (1n << BigInt(x)), andMask };
            } else {
              return { orMask, andMask: andMask | (1n << BigInt(x)) };
            }
          },
          { orMask, andMask: 0n },
        );
      });
    } else {
      address = BigInt(+address.match(/\d+/).pop());
      masks.forEach(
        ({ orMask, andMask }) => (map[(address | orMask) & ~andMask] = +value),
      );
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}
