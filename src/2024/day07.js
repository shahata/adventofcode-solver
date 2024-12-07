function getResultIfPossible(result, numbers, thirdOperator) {
  let all = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    all = all.flatMap(answer => {
      const options = [answer + numbers[i], answer * numbers[i]];
      if (thirdOperator) options.push(+`${answer}${numbers[i]}`);
      return options;
    });
  }
  return all.includes(result) ? result : 0;
}

export function part1(input, thirdOperator = false) {
  const results = input.split("\n").map(line => {
    let [result, numbers] = line.split(": ");
    numbers = numbers.split(" ").map(Number);
    return getResultIfPossible(+result, numbers, thirdOperator);
  });
  return results.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, true);
}
