export function divisors(x) {
  let result = [];
  let sqrt = Math.sqrt(x);
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
  return numbers.reduce((a, b) => {
    let m = a * b;
    while (b) {
      let t = b;
      b = a % b;
      a = t;
    }
    return m / a;
  });
}
