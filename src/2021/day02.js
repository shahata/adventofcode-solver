export function part1(input) {
  let [x, y] = [0, 0];
  const lines = input.split('\n').map(line => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
  });
  for (const line of lines) {
    if (line.direction === 'forward') {
      x += line.value;
    }
    if (line.direction === 'down') {
      y += line.value;
    }
    if (line.direction === 'up') {
      y -= line.value;
    }
  }
  return x * y;
}

export function part2(input) {
  let [aim, x, y] = [0, 0, 0];
  const lines = input.split('\n').map(line => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
  });
  for (const line of lines) {
    if (line.direction === 'forward') {
      x += line.value;
      y += line.value * aim;
    }
    if (line.direction === 'down') {
      aim += line.value;
    }
    if (line.direction === 'up') {
      aim -= line.value;
    }
  }
  return x * y;
}
