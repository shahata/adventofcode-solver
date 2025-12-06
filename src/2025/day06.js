export function part1(input) {
  let lines = input.split("\n").map(x => x.trim().split(/\s+/)); //?
  let sum = 0;
  for (let i = 0; i < lines[0].length; i++) {
    let op = lines[lines.length - 1][i];
    let result = op === "+" ? 0 : 1;
    for (let x = 0; x < lines.length - 1; x++) {
      if (op === "+") result += +lines[x][i];
      else result *= +lines[x][i];
    }
    sum += result;
  }
  return sum;
}

export function part2(input) {
  let lines = input.split("\n");
  let op = "";
  let result;
  let sum = 0;
  for (let i = 0; i < lines[0].length; i++) {
    if (op === "") {
      op = lines[lines.length - 1][i];
      result = op === "+" ? 0 : 1;
    }
    let digits = lines
      .map(x => x[i])
      .join("")
      .replace(/[+*]/, "")
      .trim();
    if (digits === "") {
      sum += result;
      op = "";
      continue;
    }
    if (op === "+") result += +digits;
    else result *= +digits;
  }
  return sum + result;
}
