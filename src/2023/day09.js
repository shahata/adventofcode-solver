function calcHistory(sequence) {
  const history = [sequence];
  let differences = sequence;
  while (differences.some(x => x !== 0)) {
    differences = differences.reduce(
      (acc, curr, i) => (i === 0 ? [] : [...acc, curr - differences[i - 1]]),
      [],
    );
    history.push(differences);
  }
  return history;
}

function getNextNumber(history) {
  for (let i = history.length - 2; i >= 0; i--) {
    history[i].push(history[i].at(-1) + history[i + 1].at(-1));
  }
  return history[0].at(-1);
}

function getPrevNumber(history) {
  for (let i = history.length - 2; i >= 0; i--) {
    history[i].unshift(history[i][0] - history[i + 1][0]);
  }
  return history[0][0];
}

export function part1(input) {
  const sequences = input.split('\n').map(line => line.split(' ').map(Number));
  const histories = sequences.map(calcHistory);
  const next = histories.map(getNextNumber);
  return next.reduce((a, b) => a + b);
}

export function part2(input) {
  const sequences = input.split('\n').map(line => line.split(' ').map(Number));
  const histories = sequences.map(calcHistory);
  const next = histories.map(getPrevNumber);
  return next.reduce((a, b) => a + b);
}
