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
