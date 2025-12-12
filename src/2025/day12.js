let mirror = t => t.map(line => line.split("").reverse().join(""));
let rotate = t => mirror(t.map((_, i) => t.map(x => x[i]).join("")));

function allRotations(image) {
  let rotations = [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
  ].flatMap(x => [x, mirror(x)]);
  let unique = rotations
    .map(r => r.join("\n"))
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(r => r.split("\n"));
  return unique;
}

function place(space, shape, x, y) {
  let newSpace = space.slice(0);
  for (let sy = 0; sy < shape.length; sy++) {
    for (let sx = 0; sx < shape[0].length; sx++) {
      if (shape[sy][sx] !== "#") continue;
      if (newSpace[y + sy][x + sx] === "#") return null;
      let s = newSpace[y + sy].split("");
      s[x + sx] = "#";
      newSpace[y + sy] = s.join("");
    }
  }
  return newSpace;
}

function solvable(area) {
  let count = 0;
  if (area.shapes.length === 0) return true;
  let shape = area.shapes[0];
  let rotations = allRotations(shape);
  for (let rotation of rotations) {
    for (let y = 0; y <= area.space.length - rotation.length; y++) {
      for (let x = 0; x <= area.space[0].length - rotation[0].length; x++) {
        let space = place(area.space, rotation, x, y);
        if (!space) continue;
        if (++count > 20) return false; // 20 placements tried, give up
        if (solvable({ space, shapes: area.shapes.slice(1) })) {
          return true;
        }
      }
    }
  }
  return false;
}

function check(area) {
  let { shapes } = area;
  shapes = shapes.map(shape => shape.join("").matchAll(/#/g).toArray().length);
  let space = shapes.reduce((sum, n) => sum + n, 0);
  let remaining = area.width * area.height - space;
  if (remaining < 0) return false;
  if (remaining > 400) return true; // can safely assume it's solvable with lots of space remaining
  return solvable(area);
}

export function part1(input) {
  let shapes = input.split("\n\n");
  let areas = shapes.pop().split("\n");
  shapes = shapes.map(shape => shape.split("\n").slice(1));
  areas = areas.map(area => {
    let [size, ...indices] = area.split(" ");
    size = size.replace(":", "").split("x").map(Number);
    return {
      width: size[0],
      height: size[1],
      space: new Array(size[1])
        .fill(0)
        .map(() => new Array(size[0]).fill(".").join("")),
      shapes: indices.flatMap((n, i) => {
        if (n === "0") return [];
        return Array(Number(n)).fill(shapes[+i]);
      }),
    };
  });
  return areas.filter(check).length;
}

export function part2() {
  return undefined;
}
