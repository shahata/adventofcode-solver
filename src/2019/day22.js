function pow(base, power, mod) {
  let result = BigInt(1);
  while (power > 0) {
    if (power % BigInt(2) == 1) {
      result = (result * base) % mod;
      power = power - BigInt(1);
    }
    power = power / BigInt(2);
    base = (base * base) % mod;
  }
  return result;
}

function modinv(a, m) {
  return pow(a, m - BigInt(2), m);
}

function reverse({ length, offset }) {
  return { length, offset: length - offset - 1 };
}

function cut({ length, offset }, count, undo) {
  if (undo) {
    return { length, offset: (offset + length + count) % length };
  } else {
    return { length, offset: (offset + length - count) % length };
  }
}

function increment({ length, offset }, count, undo) {
  if (undo) {
    const big = BigInt(offset) * modinv(BigInt(count), BigInt(length));
    return { length, offset: Number(big % BigInt(length)) };
  } else {
    return { length, offset: (offset * count) % length };
  }
}

export function part1(input, length = 10007, offset = 2019, undo, times = 1) {
  const shuffles = input.split('\n').map(l => {
    const match = l.match(/(increment|cut) (-?\d+)/);
    if (match) {
      return {
        method: match[1] === 'increment' ? increment : cut,
        count: parseInt(match[2]),
      };
    } else {
      return { method: reverse };
    }
  });

  let cards = { length, offset };
  if (undo) shuffles.reverse();
  for (let i = 0; i < times; i++) {
    shuffles.forEach(({ method, count }) => {
      cards = method(cards, count, undo);
    });
  }
  return cards.offset;
}

export function part2(input, length, times, offset = 2020) {
  length = BigInt(length || 119315717514047);
  times = BigInt(times || 101741582076661);

  //x = offset after all shuffles
  //y = offset after 1st un-shuffle
  //z = offset after 2nd un-shuffle
  const x = BigInt(offset);
  const y = BigInt(part1(input, Number(length), Number(x), true));
  const z = BigInt(part1(input, Number(length), Number(y), true));

  //y = a * x + b
  //z = a * y + b
  //y - z = a * x + b - a * y - b
  //y - z = a * x - a * y
  //y - z = a * (x - y)
  //a = (y - z) / (x - y)
  //a = (y - z) * modinv(x - y)
  const a = (y - z) * modinv(x - y, length);

  //y = a * x + b
  //b = y - a * x
  const b = y - a * x;

  //1st un-shuffle -> a * x + b
  //2nd un-shuffle -> a * (a * x + b) + b -> a^2 * x + (a + 1) * b
  //3rd un-shuffle -> a * (a * (a * x + b) + b) + b -> a^3 * x + (a^2 + a + 1) * b
  //nth un-shuffle -> a^n * x + (a^(n-1) + a^(n-2) + ... + 1) * b
  //-------------------------------------------------------------
  //a^n * x + ((a^n - 1) / (a - 1)) * b
  //a^n * x + ((a^n - 1) * modinv(a - 1)) * b
  const an = pow(a, times, length);
  const result = an * x + (an - BigInt(1)) * modinv(a - BigInt(1), length) * b;
  return Number((length + (result % length)) % length);
}
