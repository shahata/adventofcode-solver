function fft(digits) {
  const pattern = [0, 1, 0, -1];
  const result = [];
  for (let i = 0; i < digits.length; i++) {
    let calc = 0;
    for (let j = 0; j < digits.length; j++) {
      calc += digits[j] * pattern[Math.floor((j + 1) / (i + 1)) % 4];
    }
    result.push(Math.abs(calc) % 10);
  }
  return result;
}

function fft2(digits) {
  const result = new Array(digits.length);
  for (let i = digits.length - 1; i >= 0; i--) {
    const prev = result[i + 1] || 0;
    result[i] = Math.abs(prev + digits[i]) % 10;
  }
  return result;
}

export function part1(input, phases = 100) {
  let digits = input.split("").map(Number);
  for (let i = 0; i < phases; i++) {
    digits = fft(digits);
  }
  return digits.slice(0, 8).join("");
}

export function part2(input) {
  input = input.repeat(10000).slice(+input.slice(0, 7));
  let digits = input.split("").map(Number);

  for (let i = 0; i < 100; i++) {
    digits = fft2(digits);
  }

  return digits.slice(0, 8).join("");
}
