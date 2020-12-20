const toBorder = line =>
  parseInt(line.replaceAll('.', '0').replaceAll('#', '1'), 2);
const topBorder = t => t[0];
const bottomBorder = t => t[t.length - 1];
const leftBorder = t => t.map(x => x[0]).join('');
const rightBorder = t => t.map(x => x[x.length - 1]).join('');
const reverse = str => str.split('').reverse().join('');
const mirror = t => t.map(line => line.split('').reverse().join(''));
const rotate = t =>
  t.map((_, i) => t.map(x => x[i]).reverse()).map(x => x.join(''));

function getBorders(tile) {
  return [
    toBorder(topBorder(tile)),
    toBorder(bottomBorder(tile)),
    toBorder(leftBorder(tile)),
    toBorder(rightBorder(tile)),
    toBorder(reverse(bottomBorder(tile))),
    toBorder(reverse(topBorder(tile))),
    toBorder(reverse(rightBorder(tile))),
    toBorder(reverse(leftBorder(tile))),
  ];
}

function parse(tile) {
  let [id, ...rest] = tile.split('\n');
  return {
    id: +id.match(/^Tile (\d+):$/).pop(),
    tile: rest,
    borders: getBorders([...rest]),
  };
}

function countMonsters(image) {
  const pattern = [
    /^..................#./,
    /^#....##....##....###/,
    /^.#..#..#..#..#..#.../,
  ];
  let count = 0;
  for (let i = 0; i < image.length - (pattern.length - 1); i++) {
    for (let j = 0; j < image.length; j++) {
      if (pattern.every((line, k) => image[i + k].slice(j).match(line))) {
        count++;
      }
    }
  }
  return count * 15;
}

function allRotations(image) {
  return [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
    mirror(image),
    rotate(mirror(image)),
    rotate(rotate(mirror(image))),
    rotate(rotate(rotate(mirror(image)))),
  ];
}

function findRotation(tiles, borderFn, border) {
  const found = tiles.find(x => x.borders.includes(border));
  if (found) {
    tiles.splice(tiles.indexOf(found), 1);
    return allRotations(found.tile).find(x => toBorder(borderFn(x)) === border);
  }
}

function findCorners(tiles) {
  const borderToIds = new Map();
  tiles.forEach(({ id, borders }) => {
    borders.forEach(x => {
      borderToIds.set(x, (borderToIds.get(x) || []).concat(id));
    });
  });
  const idToNeighbors = new Map();
  for (let [, ids] of borderToIds.entries()) {
    if (ids.length === 2) {
      const neighbors = ids.map(id => idToNeighbors.get(id) || new Set());
      idToNeighbors.set(ids[0], neighbors[0].add(ids[1]));
      idToNeighbors.set(ids[1], neighbors[1].add(ids[0]));
    }
  }
  const corners = [];
  for (let [id, neighbors] of idToNeighbors.entries()) {
    if (neighbors.size == 2) {
      corners.push(id);
    }
  }
  return corners;
}

export function part1(input) {
  const tiles = input.split('\n\n').map(x => parse(x));
  return findCorners(tiles).reduce((a, b) => a * b);
}

export function part2(input) {
  let tiles = input.split('\n\n').map(x => parse(x));
  const corners = findCorners(tiles);

  //position first corner
  let next = tiles.find(x => x.id === corners[0])?.tile;
  tiles = tiles.filter(x => x.tile !== next);
  next = allRotations(next).find(tile => {
    const top = toBorder(topBorder(tile));
    const left = toBorder(leftBorder(tile));
    const matching = tiles.filter(
      tile => tile.borders.includes(top) || tile.borders.includes(left),
    );
    return matching.length === 0;
  });

  //position tiles one by one
  const map = [];
  for (let j = 0; next; j++) {
    map[j] = [next];
    for (let i = 0; next; i++) {
      map[j][i] = next;
      next = findRotation(tiles, leftBorder, toBorder(rightBorder(map[j][i])));
    }
    next = findRotation(tiles, topBorder, toBorder(bottomBorder(map[j][0])));
  }

  //convert to image
  const image = map.reduce((complete, row) => {
    return complete.concat(
      row.reduce((combine, tile) => {
        tile = tile.slice(1, -1).map(line => line.slice(1, -1));
        return combine.map((line, i) => line + tile[i]);
      }, new Array(row[0].length - 2).fill('')),
    );
  }, []);

  //find monsters
  const count = allRotations(image).map(x => countMonsters(x));

  //calculate roughness
  const sum = image
    .map(line => line.split('').filter(c => c === '#').length)
    .reduce((a, b) => a + b);
  return sum - count.find(x => x !== 0);
}
