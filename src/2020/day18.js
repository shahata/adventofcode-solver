function simple(formula) {
  let result = 0;
  let operation = "+";
  formula.split(" ").forEach(x => {
    if (x === "+" || x === "*") {
      operation = x;
    } else if (operation === "+") {
      result += +x;
    } else if (operation === "*") {
      result *= +x;
    }
  });
  return result;
}

function solve(formula, precedence) {
  while (
    formula.includes("(") ||
    (precedence && formula.includes("+") && formula.includes("*"))
  ) {
    if (precedence) {
      formula = formula.replace(/(\d+ \+ )+\d+/g, x => simple(x));
    }
    formula = formula.replace(/\(([^()]*)\)/g, (a, x) => simple(x));
  }
  return simple(formula);
}

export function part1(input) {
  let formulas = input.split("\n");
  return formulas.map(x => solve(x)).reduce((a, b) => a + b);
}

export function part2(input) {
  let formulas = input.split("\n");
  return formulas.map(x => solve(x, true)).reduce((a, b) => a + b);
}
