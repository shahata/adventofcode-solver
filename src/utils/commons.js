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

export function sum(numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

export function lines(input) {
  return input.split('\n');
}
