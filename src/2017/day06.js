export function day(input) {
  const banks = input.split(/\s+/).map(Number);
  const memory = {};
  let rounds = 0;
  while (memory[banks.join("-")] === undefined) {
    memory[banks.join("-")] = rounds;
    rounds++;

    const iterator = banks.reduce(
      (biggest, x, i, arr) => (x > arr[biggest] ? i : biggest),
      0,
    );
    const blocks = banks.splice(iterator, 1, 0).pop();
    for (let i = 0; i < banks.length; i++) {
      banks[i] += Math.floor(blocks / banks.length);
      if (
        (i - iterator + banks.length) % banks.length <= blocks % banks.length &&
        i !== iterator
      ) {
        banks[i]++;
      }
    }
  }

  return {
    part1: rounds,
    part2: rounds - memory[banks.join("-")],
  };
}
