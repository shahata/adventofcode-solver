const topBorder = t => t[0];
const bottomBorder = t => t[t.length - 1];
const leftBorder = t => t.map(x => x[0]).join('');
const rightBorder = t => t.map(x => x[x.length - 1]).join('');
const mirror = t => t.map(line => line.split('').reverse().join(''));
const rotate = t =>
  t.map((_, i) => t.map(x => x[i]).reverse()).map(x => x.join(''));
const findRotation = (tile, fn) => tile && allRotations(tile).find(fn);

function allRotations(image) {
  return [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
  ].flatMap(x => [x, mirror(x)]);
}

function parse(rows) {
  let [id, ...tile] = rows.split('\n');
  return {
    id: +id.match(/^Tile (\d+):$/).pop(),
    tile,
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
    return found.tile;
  }
}

function findCorners(tiles) {
  tiles.forEach(tile => {
    tile.borders.forEach(border => {
      if (tiles.find(x => x !== tile && x.borders.includes(border))) {
        tile.neighbors = (tile.neighbors || 0) + 1;
      }
    });
  });
  return tiles.filter(tile => tile.neighbors === 4).map(tile => tile.id);
}

export function part1(input) {
  const tiles = input.split('\n\n').map(x => parse(x));
  return findCorners(tiles).reduce((a, b) => a * b);
}

export function part2(input) {
  let tiles = input.split('\n\n').map(x => parse(x));
  const corners = findCorners(tiles);

  //choose the first corner
  let next = findRotation(
    spliceTile(tiles, x => x.id === corners[0]),
    tile =>
      tiles.filter(
        x =>
          x.borders.includes(topBorder(tile)) ||
          x.borders.includes(leftBorder(tile)),
      ).length === 0,
  );

  //position tiles left to right line by line
  const map = [];
  for (let j = 0; next; j++) {
    map[j] = [next];
    for (let i = 0; next; i++) {
      map[j][i] = next;
      const right = rightBorder(map[j][i]);
      next = findRotation(
        spliceTile(tiles, x => x.borders.includes(right)),
        x => leftBorder(x) === right,
      );
    }
    const bottom = bottomBorder(map[j][0]);
    next = findRotation(
      spliceTile(tiles, x => x.borders.includes(bottom)),
      x => topBorder(x) === bottom,
    );
  }

  //remove borders
  let image = map.map(row =>
    row.map(tile => tile.slice(1, -1).map(line => line.slice(1, -1))),
  );

  //merge image
  image = image.flatMap(row =>
    row.reduce((combine, tile) => combine.map((line, i) => line + tile[i])),
  );

  //find monsters
  const count = allRotations(image)
    .map(x => countMonsters(x))
    .find(x => x !== 0);

  //calculate roughness
  return image.join('').match(/#/g).length - count;
}
