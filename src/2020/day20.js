function toBorder(line) {
  return parseInt(line.replaceAll('.', '0').replaceAll('#', '1'), 2);
}
const reverse = line => line.split('').reverse().join('');
const topBorder = tile => tile[0];
const bottomBorder = tile => tile[tile.length - 1];
const leftBorder = tile => tile.map(x => x[0]).join('');
const rightBorder = tile => tile.map(x => x[x.length - 1]).join('');
const rotate = tile =>
  tile.map((row, i) =>
    [...tile]
      .reverse()
      .map(x => x[i])
      .join(''),
  );
const mirror = tile => tile.map(line => line.split('').reverse().join(''));

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

  //0:top 1:bottom 2:left 3:right
  const map = [];
  const corner = tiles.find(x => x.id === corners[0]);
  const sides = corner.borders.map(x => {
    return tiles.filter(tile => tile.borders.includes(x)).length;
  });
  tiles = tiles.filter(x => x !== corner);
  if (sides[0] === 1 && sides[3] === 1) {
    corner.tile = mirror(corner.tile);
  } else if (sides[1] === 1 && sides[2] === 1) {
    corner.tile = rotate(corner.tile);
  } else if (sides[1] === 1 && sides[3] === 1) {
    corner.tile = rotate(corner.tile);
    corner.tile = rotate(corner.tile);
  }

  let next = corner;
  for (let j = 0; next; j++) {
    map[j] = [next.tile];
    for (let i = 0; next; i++) {
      const right = toBorder(rightBorder(map[j][i]));
      next = tiles.find(x => x.borders.includes(right));
      tiles = tiles.filter(x => x !== next);
      if (next) {
        if (next.borders.indexOf(right) > 3) {
          next.borders = next.borders.slice(4);
          next.tile = rotate(rotate(next.tile));
        }
        if (next.borders[0] === right) {
          next.tile = mirror(rotate(next.tile));
        } else if (next.borders[1] === right) {
          next.tile = rotate(next.tile);
        } else if (next.borders[3] === right) {
          next.tile = mirror(next.tile);
        }
        map[j][i + 1] = next.tile;
      }
    }
    const bottom = toBorder(bottomBorder(map[j][0]));
    next = tiles.find(x => x.borders.includes(bottom));
    tiles = tiles.filter(x => x !== next);
    if (next) {
      if (next.borders.indexOf(bottom) > 3) {
        next.borders = next.borders.slice(4);
        next.tile = rotate(rotate(next.tile));
      }
      if (next.borders[1] === bottom) {
        next.tile = rotate(rotate(mirror(next.tile)));
      } else if (next.borders[2] === bottom) {
        next.tile = mirror(rotate(next.tile));
      } else if (next.borders[3] === bottom) {
        next.tile = rotate(rotate(rotate(next.tile)));
      }
    }
  }

  const image = map.reduce((complete, row) => {
    return complete.concat(
      row.reduce((combine, tile) => {
        tile = tile.slice(1, -1).map(line => line.slice(1, -1));
        return combine.map((line, i) => line + tile[i]);
      }, new Array(row[0].length - 2).fill('')),
    );
  }, []);

  const count = [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
    mirror(image),
    rotate(mirror(image)),
    rotate(rotate(mirror(image))),
    rotate(rotate(rotate(mirror(image)))),
  ].map(x => countMonsters(x));

  const sum = image
    .map(line => line.split('').filter(c => c === '#').length)
    .reduce((a, b) => a + b);
  return sum - count.find(x => x !== 0);
}
