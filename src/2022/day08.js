function calcVisibility(tree, max) {
  if (tree.height > max) {
    tree.visible = true;
    max = tree.height;
  }
  return max;
}

export function part1(input) {
  const map = input
    .split('\n')
    .map(line => line.split('').map(x => ({ height: +x })));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0, max = -1; j < map[i].length; j++) {
      max = calcVisibility(map[i][j], max);
    }
    for (let j = map[i].length - 1, max = -1; j >= 0; j--) {
      max = calcVisibility(map[i][j], max);
    }
  }
  for (let j = 0; j < map[0].length; j++) {
    for (let i = 0, max = -1; i < map.length; i++) {
      max = calcVisibility(map[i][j], max);
    }
    for (let i = map.length - 1, max = -1; i >= 0; i--) {
      max = calcVisibility(map[i][j], max);
    }
  }
  let count = 0;
  for (const line of map) {
    count += line.filter(x => x.visible).length;
  }
  return count;
}

function calcScore(lines, i, j) {
  let score1 = 0;
  for (let xi = i + 1; xi < lines.length; xi++) {
    score1++;
    if (lines[xi][j].height >= lines[i][j].height) break;
  }
  let score2 = 0;
  for (let xi = i - 1; xi >= 0; xi--) {
    score2++;
    if (lines[xi][j].height >= lines[i][j].height) break;
  }
  let score3 = 0;
  for (let xj = j + 1; xj < lines[0].length; xj++) {
    score3++;
    if (lines[i][xj].height >= lines[i][j].height) break;
  }
  let score4 = 0;
  for (let xj = j - 1; xj >= 0; xj--) {
    score4++;
    if (lines[i][xj].height >= lines[i][j].height) break;
  }
  return score1 * score2 * score3 * score4;
}

export function part2(input) {
  const lines = input
    .split('\n')
    .map(line => line.split('').map(x => ({ height: +x })));
  let max = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = lines[i].length - 1; j >= 0; j--) {
      const score = calcScore(lines, i, j);
      if (score > max) max = score;
    }
  }
  return max;
}
