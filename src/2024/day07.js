function getPossibleAnswers(numbers, thirdOperator) {
  if (numbers.length === 1) return numbers;
  return getPossibleAnswers(numbers.slice(1), thirdOperator).flatMap(answer => {
    return [answer + numbers[0], answer * numbers[0]].concat(
      thirdOperator ? +`${answer}${numbers[0]}` : [],
    );
  });
}

export function part1(input, thirdOperator = false) {
  const equations = input.split("\n").map(line => {
    const [result, numbers] = line.split(": ");
    return [+result, numbers.split(" ").map(Number).reverse()];
  });
  const solvable = equations.filter(([result, numbers]) => {
    return getPossibleAnswers(numbers, thirdOperator).includes(result);
  });
  return solvable.reduce((acc, [result]) => acc + result, 0);
}

export function part2(input) {
  return part1(input, true);
}
