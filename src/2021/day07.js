export function part1(input) {
  const positions = input.split(',').map(x => +x);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const distances = [];
  for (let i = min; i <= max; i++) {
    distances.push(positions.reduce((prev, x) => prev + Math.abs(x - i), 0));
  }
  return Math.min(...distances);
}

export function part2(input) {
  const positions = input.split(',').map(x => +x);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const distances = [];
  for (let i = min; i <= max; i++) {
    distances.push(
      positions.reduce((prev, x) => {
        let sum = 0;
        for (let j = 1; j <= Math.abs(x - i); j++) sum += j;
        return prev + sum;
      }, 0),
    );
  }
  return Math.min(...distances);
}
