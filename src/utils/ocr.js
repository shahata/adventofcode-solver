const alphabet = {
  '.##.#..##..######..##..#': 'A',
  '###.#..####.#..##..####.': 'B',
  '.##.#..##...#...#..#.##.': 'C',
  '#####...###.#...#...####': 'E',
  '#####...###.#...#...#...': 'F',
  '.##.#..##...#.###..#.###': 'G',
  '#..##..######..##..##..#': 'H',
  '.###..#...#...#...#..###': 'I',
  '..##...#...#...##..#.##.': 'J',
  '#..##.#.##..#.#.#.#.#..#': 'K',
  '#...#...#...#...#...####': 'L',
  '.##.#..##..##..##..#.##.': 'O',
  '###.#..##..####.#...#...': 'P',
  '###.#..##..####.#.#.#..#': 'R',
  '.####...#....##....####.': 'S',
  '#..##..##..##..##..#.##.': 'U',
  '#...#....#.#..#...#...#.': 'Y',
  '####...#..#..#..#...####': 'Z',
  '..##...#..#.#....##....##....########....##....##....##....#': 'A',
  '#####.#....##....##....######.#....##....##....##....######.': 'B',
  '.####.#....##.....#.....#.....#.....#.....#.....#....#.####.': 'C',
  '#######.....#.....#.....#####.#.....#.....#.....#.....######': 'E',
  '#######.....#.....#.....#####.#.....#.....#.....#.....#.....': 'F',
  '.####.#....##.....#.....#.....#..####....##....##...##.###.#': 'G',
  '#....##....##....##....########....##....##....##....##....#': 'H',
  '...###....#.....#.....#.....#.....#.....#.#...#.#...#..###..': 'J',
  '#....##...#.#..#..#.#...##....##....#.#...#..#..#...#.#....#': 'K',
  '#.....#.....#.....#.....#.....#.....#.....#.....#.....######': 'L',
  '#....###...###...##.#..##.#..##..#.##..#.##...###...###....#': 'N',
  '#####.#....##....##....######.#.....#.....#.....#.....#.....': 'P',
  '#####.#....##....##....######.#..#..#...#.#...#.#....##....#': 'R',
  '#....##....#.#..#..#..#...##....##...#..#..#..#.#....##....#': 'X',
  '######.....#.....#....#....#....#....#....#.....#.....######': 'Z',
};

export function ocr(image) {
  let lines = image.split('\n');
  if (lines.length === 6) {
    const letters = (lines[0].length - 1) / 5;
    let result = '';
    for (let i = 0; i < letters; i++) {
      const letter = lines.map(x => x.slice(i * 5 + 1, i * 5 + 5)).join('');
      result += alphabet[letter];
    }
    return result.length === letters ? result : image;
  } else {
    lines = lines.map(x => `..${x}..`);
    const letters = (lines[0].length - 2) / 8;
    let result = '';
    for (let i = 0; i < letters; i++) {
      const letter = lines.map(x => x.slice(i * 8 + 2, i * 8 + 8)).join('');
      result += alphabet[letter];
    }
    return result.length === letters ? result : `\n${image}`;
  }
}
