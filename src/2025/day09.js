export function part1(input) {
  let points = input.split("\n").map(line => {
    let [x, y] = line.split(",").map(Number);
    return { x, y };
  });
  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let p1 = points[i];
      let p2 = points[j];
      let area = (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

export function part2(input) {
  let points = input.split("\n").map(line => {
    let [x, y] = line.split(",").map(Number);
    return { x, y };
  });
  let squares = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let p1 = points[i];
      let p2 = points[j];
      let area = (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
      squares.push({ area, p1, p2 });
    }
  }
  squares.sort((a, b) => b.area - a.area);

  let sides = [];
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];
    sides.push({ p1, p2 });
  }

  const disjoint = (a1, a2, b1, b2) =>
    (a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) ||
    (a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);

  return squares.find(square => {
    return sides.every(
      side =>
        disjoint(side.p1.y, side.p2.y, square.p1.y, square.p2.y) ||
        disjoint(side.p1.x, side.p2.x, square.p1.x, square.p2.x),
    );
  }).area;
}
