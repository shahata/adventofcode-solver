const reducers = {
  "+": arr => arr.reduce((a, b) => a + b, 0),
  "*": arr => arr.reduce((a, b) => a * b, 1),
};

export function part1(input) {
  let lines = input.split("\n").map(x => x.trim().split(/\s+/));
  let ops = lines.pop();
  let sum = 0;
  for (let i = 0; i < lines[0].length; i++) {
    let arr = lines.map(x => +x[i]);
    sum += reducers[ops[i]](arr);
  }
  return sum;
}

export function part2(input) {
  let lines = input.split("\n");
  let ops = lines.pop();
  let arr = [];
  let sum = 0;
  let reducer;
  for (let i = 0; i <= lines[0].length; i++) {
    let digits = lines.map(x => x[i]).join("");
    digits = digits.trim();
    reducer = reducers[ops[i]] || reducer;
    if (digits) arr.push(+digits);
    else sum += reducer(arr.splice(0));
  }
  return sum;
}
