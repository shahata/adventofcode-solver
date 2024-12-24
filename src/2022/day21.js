function parse(input) {
  return input
    .split("\n")
    .map(line => {
      if (line.match(/^([a-z]+): (\d+)$/)) {
        let [, variable, number] = line.match(/^([a-z]+): (\d+)$/);
        return { variable, number: +number };
      } else if (line.match(/^([a-z]+): ([a-z]+) (.) ([a-z]+)$/)) {
        let [, variable, param1, operator, param2] = line.match(
          /^([a-z]+): ([a-z]+) (.) ([a-z]+)$/,
        );
        return { variable, param1, operator, param2 };
      } else return undefined;
    })
    .reduce((obj, x) => ({ ...obj, [x.variable]: x }), {});
}

function calc(code, name) {
  let line = code[name];
  if (line.number !== undefined) return line.number;
  let val1 = calc(code, line.param1);
  let val2 = calc(code, line.param2);
  switch (line.operator) {
    case "+":
      return val1 + val2;
    case "-":
      return val1 - val2;
    case "/":
      return val1 / val2;
    case "*":
      return val1 * val2;
  }
}

function calc2(code, name, result) {
  if (name === "humn") return result;
  let line = code[name];
  let val1 = calc(code, line.param1);
  let val2 = calc(code, line.param2);
  if (Number.isNaN(val1)) {
    if (name === "root") return calc2(code, line.param1, val2);
    switch (line.operator) {
      case "+":
        return calc2(code, line.param1, result - val2);
      case "-":
        return calc2(code, line.param1, result + val2);
      case "*":
        return calc2(code, line.param1, result / val2);
      case "/":
        return calc2(code, line.param1, result * val2);
    }
  }
  if (Number.isNaN(val2)) {
    if (name === "root") return calc2(code, line.param2, val1);
    switch (line.operator) {
      case "+":
        return calc2(code, line.param2, result - val1);
      case "-":
        return calc2(code, line.param2, val1 - result);
      case "*":
        return calc2(code, line.param2, result / val1);
      case "/":
        return calc2(code, line.param2, val1 / result);
    }
  }
}

export function part1(input) {
  let code = parse(input);
  return calc(code, "root");
}

export function part2(input) {
  let code = parse(input);
  code.humn.number = NaN;
  return calc2(code, "root");
}
