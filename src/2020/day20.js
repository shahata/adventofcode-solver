function rightBorder(tile) {
  return parseInt(
    tile
      .map(x => x[x.length - 1])
      .join('')
      .replaceAll('.', '0')
      .replaceAll('#', '1'),
    2,
  );
}
function bottomBorder(tile) {
  return parseInt(
    tile[tile.length - 1].replaceAll('.', '0').replaceAll('#', '1'),
    2,
  );
}
function getBorders(tile) {
  return [
    parseInt(tile[0].replaceAll('.', '0').replaceAll('#', '1'), 2),
    parseInt(
      tile[tile.length - 1].replaceAll('.', '0').replaceAll('#', '1'),
      2,
    ),
    parseInt(
      tile
        .map(x => x[0])
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
    parseInt(
      tile
        .map(x => x[x.length - 1])
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
    //
    parseInt(
      tile[tile.length - 1]
        .split('')
        .reverse()
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
    parseInt(
      tile[0]
        .split('')
        .reverse()
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
    parseInt(
      tile
        .map(x => x[x.length - 1])
        .reverse()
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
    parseInt(
      tile
        .map(x => x[0])
        .reverse()
        .join('')
        .replaceAll('.', '0')
        .replaceAll('#', '1'),
      2,
    ),
  ];
}

function parse(tile) {
  let [id, ...rest] = tile.split('\n');
  [, id] = id.match(/^Tile (\d+):$/);
  id = +id;
  return {
    id,
    tile: rest,
    borders: getBorders([...rest]),
  };
}
export function part1(input) {
  const tiles = input.split('\n\n').map(x => parse(x));
  const map = new Map();
  tiles.forEach(({ id, borders }) => {
    borders.forEach(x => {
      map.set(x, (map.get(x) || []).concat(id));
    });
  });
  let map2 = {};
  for (let [, ids] of map.entries()) {
    if (ids.length === 2) {
      map2[ids[0]] = (map2[ids[0]] || new Set()).add(ids[1]);
      map2[ids[1]] = (map2[ids[1]] || new Set()).add(ids[0]);
    }
  }
  let result = 1;
  for (let id in map2) {
    if (map2[id].size == 2) {
      result *= id;
    }
  }
  return result;
}

export function part2(input) {
  let tiles = input.split('\n\n').map(x => parse(x));
  const map = new Map();
  tiles.forEach(({ id, borders }) => {
    borders.forEach(x => {
      map.set(x, (map.get(x) || []).concat(id));
    });
  });
  let map2 = {};
  for (let [, ids] of map.entries()) {
    if (ids.length === 2) {
      map2[ids[0]] = (map2[ids[0]] || new Set()).add(ids[1]);
      map2[ids[1]] = (map2[ids[1]] || new Set()).add(ids[0]);
    }
  }
  const corners = [];
  for (let id in map2) {
    if (map2[id].size == 2) {
      corners.push(+id);
    }
  }
  //top bottom left right

  // return corners;
  // return corners.filter(corner => {
  //   const tile = tiles.find(x => x.id === corner);
  //   return (
  //     map.get(tile.borders[2]).length === 1 && map.get(tile.borders[4]).length === 1
  //   );
  // });//?
  const corner = tiles.find(x => x.id === corners[3]);
  tiles = tiles.filter(x => x !== corner);
  corner.borders.slice(0, 4).map(b => {
    return map.get(b).length;
  });
  let image = [];
  image[0] = [corner.tile.map(line => line.split('').reverse().join(''))]; //flip
  let j = 0;
  let i = 0;
  while (j >= 0) {
    while (i >= 0) {
      const r = rightBorder(image[j][i]);
      const next = tiles.find(x => x.borders.includes(r));
      tiles = tiles.filter(x => x !== next);
      if (!next) {
        break;
      }
      if (next.borders.indexOf(r) > 3) {
        next.borders = next.borders.slice(4);
        next.tile = next.tile.map(line => line.split('').reverse().join(''));
        next.tile = next.tile.reverse();
      }
      if (next.borders[0] === r) {
        next.tile = next.tile.map((row, i) =>
          next.tile.map(x => x[i]).join(''),
        );
      }
      if (next.borders[1] === r) {
        next.tile = next.tile.map((row, i) =>
          [...next.tile]
            .reverse()
            .map(x => x[i])
            .join(''),
        );
      }
      if (next.borders[2] === r) {
        next.tile = [...next.tile];
      }
      if (next.borders[3] === r) {
        next.tile = next.tile.map(line => line.split('').reverse().join(''));
      }
      image[j][i + 1] = next.tile;
      i++;
    }
    i = 0;
    const b = bottomBorder(image[j][i]);
    const next = tiles.find(x => x.borders.includes(b));
    tiles = tiles.filter(x => x !== next);
    if (!next) {
      break;
    }
    if (next.borders.indexOf(b) > 3) {
      next.borders = next.borders.slice(4);
      next.tile = next.tile.map(line => line.split('').reverse().join(''));
      next.tile = next.tile.reverse();
    }
    if (next.borders[0] === b) {
      next.tile = [...next.tile];
    }
    if (next.borders[1] === b) {
      next.tile = [...next.tile].reverse();
    }
    if (next.borders[2] === b) {
      next.tile = next.tile.map((row, i) => next.tile.map(x => x[i]).join(''));
    }
    if (next.borders[3] === b) {
      next.tile = next.tile.map((row, i) =>
        next.tile.map(x => x[x.length - 1 - i]).join(''),
      );
    }
    image[j + 1] = [next.tile];
    j++;
  }
  j;
  image = image.reduce((complete, row) => {
    return complete.concat(
      row.reduce((combine, tile) => {
        tile = tile.slice(1, -1).map(line => line.slice(1, -1));
        return combine.map((line, i) => line + tile[i]);
      }, new Array(row[0].length - 2).fill('')),
    );
  }, []);
  image;

  const pattern = [
    /^..................#./,
    /^#....##....##....###/,
    /^.#..#..#..#..#..#.../,
  ];
  let count = 0;
  if (image.length === 24) {
    image = image.map((row, i) => image.map(x => x[x.length - 1 - i]).join(''));
  } else {
    image = image.map(line => line.split('').reverse().join(''));
    image = image.reverse();
  }
  // image = image.map((row, i) => image.map(x => x[i]).join(''));
  // image = image.map((row, i) =>
  //   [...image]
  //     .reverse()
  //     .map(x => x[i])
  //     .join(''),
  // );
  // image = image.map(line => line.split('').reverse().join(''));
  // image = [...image].reverse();
  // image = image.map((row, i) => image.map(x => x[i]).join(''));
  for (let index = 0; index < image.length - 2; index++) {
    for (let i = 0; i < image.length; i++) {
      if (
        image[index].slice(i).match(pattern[0]) &&
        image[index + 1].slice(i).match(pattern[1]) &&
        image[index + 2].slice(i).match(pattern[2])
      ) {
        count++;
      }
    }
  }

  const sum = image
    .map(line => line.split('').filter(c => c === '#').length)
    .reduce((a, b) => a + b);
  return sum - count * 15;
}
