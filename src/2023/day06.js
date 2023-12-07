// function solve(time, distance) {
//   let result = 0;
//   for (let i = 0; i <= time; i++) {
//     if ((time - i) * i > distance) result++;
//   }
//   return result;
// }

function solve(time, distance) {
  for (let i = Math.floor(distance / time); i <= time; i++) {
    if ((time - i) * i > distance) {
      return time - i * 2 + 1;
    }
  }
}

export function part1(input) {
  let [time, distance] = input.split('\n');
  time = time.split(/\s+/).slice(1).map(Number);
  distance = distance.split(/\s+/).slice(1).map(Number);
  const races = time.map((time, i) => ({ time, distance: distance[i] }));
  const options = races.map(({ time, distance }) => solve(time, distance));
  return options.reduce((a, b) => a * b, 1);
}

export function part2(input) {
  let [time, distance] = input.replaceAll(' ', '').split('\n');
  time = +time.split(':')[1];
  distance = +distance.split(':')[1];
  return solve(time, distance);
}
