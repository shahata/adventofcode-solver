export function divisors(x) {
  const result = [];
  const sqrt = Math.sqrt(x);
  for (let i = 1; i <= sqrt; i++) {
    if (x % i === 0) {
      result.push(i);
      if (i !== sqrt) {
        result.push(x / i);
      }
    }
  }
  return result;
}

//lcm = a*b/gcd(a,b)
export function lcm(numbers) {
  return numbers
    .map(x => Math.abs(x))
    .reduce((a, b) => {
      const m = a * b;
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return m / a;
    });
}
