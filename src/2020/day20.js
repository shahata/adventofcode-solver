const topBorder = t => t[0];
const bottomBorder = t => t.at(-1);
const leftBorder = t => t.map(x => x[0]).join('');
const rightBorder = t => t.map(x => x.at(-1)).join('');
const mirror = t => t.map(line => line.split('').reverse().join(''));
const rotate = t => mirror(t.map((_, i) => t.map(x => x[i]).join('')));
const findRotation = (tile, fn) => tile && tile.rotations.find(fn);

function allRotations(image) {
  return [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
  ].flatMap(x => [x, mirror(x)]);
}

function parse(rows) {
  const [id, ...tile] = rows.split('\n');
  return {
    id: +id.match(/^Tile (\d+):$/).pop(),
    tile,
    rotations: allRotations(tile),
    borders: allRotations(tile).map(tile => topBorder(tile)),
  };
}

function countMonsters(image) {
  const monster = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   ',
  ];
  const pattern = monster.map(x => new RegExp(`^${x.replaceAll(' ', '.')}`));
  const size = monster.join('').match(/#/g).length;
  let count = 0;
  for (let i = 0; i < image.length - (pattern.length - 1); i++) {
    for (let j = 0; j < image.length; j++) {
      if (pattern.every((line, k) => image[i + k].slice(j).match(line))) {
        count++;
      }
    }
  }
  return count * size;
}

function spliceTile(tiles, fn) {
  const found = tiles.find(fn);
  if (found) {
    tiles.splice(tiles.indexOf(found), 1);
    return found;
  }
}

function findCorners(tiles) {
  const corners = tiles.filter(tile => {
    const matching = tiles
      .filter(({ id }) => tile.id !== id)
      .filter(({ borders }) => borders.some(x => tile.borders.includes(x)));
    return new Set(matching).size === 2;
  });
  return corners.map(tile => tile.id);
}

function solvePuzzle(tiles, first) {
  //rotate the first corner so its free sides are on the top and left
  let next = findRotation(
    spliceTile(tiles, x => x.id === first),
    tile => {
      const matching = tiles.filter(({ borders }) =>
        borders.some(x => x === topBorder(tile) || x === leftBorder(tile)),
      );
      return matching.length === 0;
    },
  );

  //position tiles left to right line by line
  const map = [[]];
  while (next) {
    //place part to the right of the previous part
    //(left border of new part connects to the right border of previous part)
    const right = rightBorder(next);
    map.at(-1).push(next);
    next = findRotation(
      spliceTile(tiles, x => x.borders.includes(right)),
      x => leftBorder(x) === right,
    );

    //if no more parts to the right, place leftmost part in next row
    //(top border of new part connects to the bottom border of previous line)
    if (!next) {
      const bottom = bottomBorder(map.at(-1)[0]);
      map.push([]);
      next = findRotation(
        spliceTile(tiles, x => x.borders.includes(bottom)),
        x => topBorder(x) === bottom,
      );
    }
  }
  map.pop();
  return map;
}

export function part1(input) {
  const tiles = input.split('\n\n').map(x => parse(x));
  return findCorners(tiles).reduce((a, b) => a * b);
}

export function part2(input) {
  const tiles = input.split('\n\n').map(x => parse(x));
  const corners = findCorners(tiles);
  const map = solvePuzzle(tiles, corners[0]);

  //remove borders
  const stripped = map.map(row =>
    row.map(tile => tile.slice(1, -1).map(line => line.slice(1, -1))),
  );

  //merge image
  const image = stripped.flatMap(row =>
    row.reduce((combine, tile) => combine.map((line, i) => line + tile[i])),
  );

  //find monsters
  const count = allRotations(image)
    .map(x => countMonsters(x))
    .find(x => x !== 0);

  //calculate roughness
  return image.join('').match(/#/g).length - count;
}
