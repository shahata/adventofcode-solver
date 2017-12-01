function day(input) {
  const boxes = input.split('\n').map(x => parseInt(x, 10));
  const result = new Array(boxes.length).fill(0);
  const pad = result.join('');

  for (let i = Math.pow(2, boxes.length) - 1; i > 0; i--) {
    const select = (pad + i.toString(2)).slice(-boxes.length).split('').map(x => parseInt(x, 10));
    if (select.map((x, index) => x * boxes[index]).reduce((sum, x) => sum + x) === 150) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  const part1 = result.reduce((sum, x) => sum + x);
  const part2 = result.filter(x => x).shift();
  return [part1, part2];
}

module.exports = {day};
