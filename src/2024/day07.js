function getPossibleAnswers(numbers, thirdOperator) {
  let result = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    result = result.flatMap(answer => {
      const options = [answer + numbers[i], answer * numbers[i]];
      if (thirdOperator) options.push(+`${answer}${numbers[i]}`);
      return options;
    });
  }
  return result;
}

export function part1(input, thirdOperator = false) {
  const equations = input.split("\n").map(line => {
    const [result, numbers] = line.split(": ");
    return [+result, numbers.split(" ").map(Number)];
  });
  const solvable = equations.filter(([result, numbers]) => {
    return getPossibleAnswers(numbers, thirdOperator).includes(result);
  });
  return solvable.reduce((acc, [result]) => acc + result, 0);
}

export function part2(input) {
  return part1(input, true);
}
