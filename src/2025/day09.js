// import { Box, BooleanOperations, Polygon } from "@flatten-js/core";
// const { intersect } = BooleanOperations;

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
      let area = Math.abs(p1.x - p2.x + 1) * Math.abs(p1.y - p2.y + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

function connectPoints(p1, p2, grid) {
  let xStep = p1.x < p2.x ? 1 : p1.x > p2.x ? -1 : 0;
  let yStep = p1.y < p2.y ? 1 : p1.y > p2.y ? -1 : 0;
  let x = p1.x;
  let y = p1.y;
  while (x !== p2.x || y !== p2.y) {
    grid.set(`${y},${x}`, 1);
    x += xStep;
    y += yStep;
  }
}

function findPointWithinShape(grid, height, width) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      x = (Math.random() * width) | 0;
      y = (Math.random() * height) | 0;
      if (grid.get(`${y},${x}`) === 1) continue;
      let queue = [{ x, y }];
      let visited = new Set();
      let found = true;
      while (queue.length > 0) {
        let { x: cx, y: cy } = queue.shift();
        let key = `${cx},${cy}`;
        if (visited.has(key)) continue;
        visited.add(key);
        if (cx < 0 || cx >= width || cy < 0 || cy >= height) {
          found = false;
          break;
        }
        if (grid.get(`${cy},${cx}`) === 1) continue;
        queue.push({ x: cx + 1, y: cy });
        queue.push({ x: cx - 1, y: cy });
        queue.push({ x: cx, y: cy + 1 });
        queue.push({ x: cx, y: cy - 1 });
      }
      if (found) {
        return { x, y };
      }
    }
  }
  return null;
}

function fillGrid(points, grid, height, width) {
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];
    connectPoints(p1, p2, grid);
  }
  let insidePoint = findPointWithinShape(grid, height, width);
  let queue = [insidePoint];
  let visited = new Set();
  while (queue.length > 0) {
    let { x: cx, y: cy } = queue.shift();
    let key = `${cx},${cy}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (grid.get(`${cy},${cx}`) === 1) continue;
    grid.set(`${cy},${cx}`, 1);
    queue.push({ x: cx + 1, y: cy });
    queue.push({ x: cx - 1, y: cy });
    queue.push({ x: cx, y: cy + 1 });
    queue.push({ x: cx, y: cy - 1 });
  }
}

// function test(input) {
//   let points = input.split("\n").map(line => {
//     let [x, y] = line.split(",").map(Number);
//     return { x, y };
//   });
//   let maxArea = 0;
//   let polygon = new Polygon(points.map(p => [p.x, p.y]));
//   for (let i = 0; i < points.length; i++) {
//     for (let j = i + 1; j < points.length; j++) {
//       let a = points[i];
//       let b = points[j];
//       let minX = Math.min(a.x, b.x);
//       let maxX = Math.max(a.x, b.x);
//       let minY = Math.min(a.y, b.y);
//       let maxY = Math.max(a.y, b.y);
//       let box = new Box(minX, minY, maxX, maxY);

//       let boxPolygon = new Polygon(box);
//       try {
//         let intersectionArea = intersect(polygon, boxPolygon).area();
//         let boxArea = boxPolygon.area();
//         if (intersectionArea === boxArea) {
//           let area = Math.abs(a.x - b.x + 1) * Math.abs(a.y - b.y + 1);
//           if (area > maxArea) {
//             maxArea = area;
//           }
//         }
//       } catch {
//         //
//       }
//     }
//   }
//   return maxArea;
// }

function slow(input) {
  let points = input.split("\n").map(line => {
    let [x, y] = line.split(",").map(Number);
    return { x, y };
  });
  let maxArea = 0;
  for (let p of points) {
    p.x = Math.floor(p.x / 100);
    p.y = Math.floor(p.y / 100);
  }
  let maxX = Math.max(...points.map(p => p.x));
  let maxY = Math.max(...points.map(p => p.y));
  let grid = new Map();
  fillGrid(points, grid, maxY + 1, maxX + 1);
  let result;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let p1 = points[i];
      let p2 = points[j];
      let isContained = true;
      let minX = Math.min(p1.x, p2.x);
      let maxX = Math.max(p1.x, p2.x);
      let minY = Math.min(p1.y, p2.y);
      let maxY = Math.max(p1.y, p2.y);
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          if (grid.get(`${y},${x}`) !== 1) {
            isContained = false;
            break;
          }
        }
        if (!isContained) break;
      }
      if (!isContained) continue;
      let area = Math.abs(p1.x - p2.x + 1) * Math.abs(p1.y - p2.y + 1);
      if (area > maxArea) {
        maxArea = area;
        result = { i, j };
      }
    }
  }
  points = input.split("\n").map(line => {
    let [x, y] = line.split(",").map(Number);
    return { x, y };
  });
  let p1 = points[result.i];
  let p2 = points[result.j];
  maxArea = Math.abs(p1.x - p2.x + 1) * Math.abs(p1.y - p2.y + 1);
  return maxArea;
}

export function part2(input) {
  return slow(input);
}
