function solve(input, fn) {
  const sequences = input.split("\n").map(line => line.split(" ").map(Number));
  const histories = sequences.map(sequence => {
    const history = [sequence];
    let differences = sequence;
    while (differences.some(x => x !== 0)) {
      differences = differences.reduce(
        (acc, curr, i, arr) => (i === 0 ? acc : acc.concat(curr - arr[i - 1])),
        [],
      );
      history.push(differences);
    }
    return history;
  });
  return histories.map(fn).reduce((a, b) => a + b);
}

function getNextNumber(history) {
  for (let i = history.length - 2; i >= 0; i--) {
    history[i].push(history[i].at(-1) + history[i + 1].at(-1));
  }
  return history[0].at(-1);
}

function getPrevNumber(history) {
  for (let i = history.length - 2; i >= 0; i--) {
    history[i].unshift(history[i].at(0) - history[i + 1].at(0));
  }
  return history[0].at(0);
}

export function part1(input) {
  return solve(input, getNextNumber);
}

export function part2(input) {
  return solve(input, getPrevNumber);
}
