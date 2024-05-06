export function part1(input) {
  const numbers = input.split('\n');
  let sum = 0;
  for (const num of numbers) {
    let result = 0;
    let fives = 1;
    for (let i = num.length - 1; i >= 0; i--) {
      result += fives * (num[i] === '=' ? -2 : num[i] === '-' ? -1 : +num[i]);
      fives *= 5;
    }
    sum += result;
  }

  const arr = sum.toString(5).split('');
  let answer = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (+arr[i] < 3) answer.unshift(arr[i]);
    else {
      const next = +arr[i] - 5;
      answer.unshift(next === -2 ? '=' : next === -1 ? '-' : `${next}`);
      arr[i - 1] = `${+arr[i - 1] + 1}`;
    }
  }
  return answer.join('');
}

export function part2() {
  return undefined;
}
