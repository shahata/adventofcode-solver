function pow(base, power, mod) {
  let result = BigInt(1);
  while (power > 0) {
    if (power % BigInt(2) === BigInt(1)) {
      result = (result * base) % mod;
    }
    power = (power - (power % BigInt(2))) / BigInt(2);
    base = (base * base) % mod;
  }
  return result;
}

function modInverse(a, m) {
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
    const big = BigInt(offset) * modInverse(BigInt(count), BigInt(length));
    return { length, offset: Number(big % BigInt(length)) };
  } else {
    return { length, offset: (offset * count) % length };
  }
}

export function part1(input, length = 10007, offset = 2019, undo = undefined) {
  const shuffles = input.split("\n").map(l => {
    const match = l.match(/(increment|cut) (-?\d+)/);
    if (match) {
      return {
        method: match[1] === "increment" ? increment : cut,
        count: parseInt(match[2]),
      };
    } else {
      return { method: reverse };
    }
  });

  let cards = { length, offset };
  if (undo) shuffles.reverse();
  shuffles.forEach(({ method, count }) => {
    cards = method(cards, count, undo);
  });
  return cards.offset;
}

export function part2(input, length, times, offset = 2020) {
  const m = BigInt(length || 119315717514047);
  const n = BigInt(times || 101741582076661);

  //x = offset after all shuffles
  //y = offset after 1st un-shuffle
  //z = offset after 2nd un-shuffle
  const x = BigInt(offset);
  const y = BigInt(part1(input, Number(m), Number(x), true));
  const z = BigInt(part1(input, Number(m), Number(y), true));

  //y = a * x + b
  //z = a * y + b
  //y - z = a * x + b - a * y - b
  //y - z = a * x - a * y
  //y - z = a * (x - y)
  //a = (y - z) / (x - y)
  //a = (y - z) * modInverse(x - y)
  const a = (y - z) * modInverse(x - y, m);

  //y = a * x + b
  //b = y - a * x
  const b = y - a * x;

  //1st un-shuffle -> a * x + b
  //2nd un-shuffle -> a * (a * x + b) + b -> a^2 * x + (a + 1) * b
  //3rd un-shuffle -> a * (a * (a * x + b) + b) + b -> a^3 * x + (a^2 + a + 1) * b
  //nth un-shuffle -> a^n * x + (a^(n-1) + a^(n-2) + ... + 1) * b
  //-------------------------------------------------------------
  //a^n * x + ((a^n - 1) / (a - 1)) * b
  //a^n * x + ((a^n - 1) * modInverse(a - 1)) * b
  const an = pow(a, n, m);
  const result = an * x + (an - BigInt(1)) * modInverse(a - BigInt(1), m) * b;
  return Number((m + (result % m)) % m);
}
