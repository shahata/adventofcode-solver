let alphabet = {
  ".##.#..##..######..##..#": "A",
  "###.#..####.#..##..####.": "B",
  ".##.#..##...#...#..#.##.": "C",
  "#####...###.#...#...####": "E",
  "#####...###.#...#...#...": "F",
  ".##.#..##...#.###..#.###": "G",
  "#..##..######..##..##..#": "H",
  ".###..#...#...#...#..###": "I",
  "..##...#...#...##..#.##.": "J",
  "#..##.#.##..#.#.#.#.#..#": "K",
  "#...#...#...#...#...####": "L",
  ".##.#..##..##..##..#.##.": "O",
  "###.#..##..####.#...#...": "P",
  "###.#..##..####.#.#.#..#": "R",
  ".####...#....##....####.": "S",
  "#..##..##..##..##..#.##.": "U",
  "#...#....#.#..#...#...#.": "Y",
  "####...#..#..#..#...####": "Z",
  "..##...#..#.#....##....##....########....##....##....##....#": "A",
  "#####.#....##....##....######.#....##....##....##....######.": "B",
  ".####.#....##.....#.....#.....#.....#.....#.....#....#.####.": "C",
  "#######.....#.....#.....#####.#.....#.....#.....#.....######": "E",
  "#######.....#.....#.....#####.#.....#.....#.....#.....#.....": "F",
  ".####.#....##.....#.....#.....#..####....##....##...##.###.#": "G",
  "#....##....##....##....########....##....##....##....##....#": "H",
  "...###....#.....#.....#.....#.....#.....#.#...#.#...#..###..": "J",
  "#....##...#.#..#..#.#...##....##....#.#...#..#..#...#.#....#": "K",
  "#.....#.....#.....#.....#.....#.....#.....#.....#.....######": "L",
  "#....###...###...##.#..##.#..##..#.##..#.##...###...###....#": "N",
  "#####.#....##....##....######.#.....#.....#.....#.....#.....": "P",
  "#####.#....##....##....######.#..#..#...#.#...#.#....##....#": "R",
  "#....##....#.#..#..#..#...##....##...#..#..#..#.#....##....#": "X",
  "######.....#.....#....#....#....#....#....#.....#.....######": "Z",
};

export function ocr(image) {
  let lines = image.trim().split("\n");
  let width = lines.length === 6 ? 4 : 6;
  let spaces = lines.length === 6 ? 1 : 2;
  let result = "";
  if (lines.length === 6 && lines[0].length % 5 !== 0) {
    lines = lines.map(x => x.replace(/^\./, ""));
  }
  let letters = Math.ceil(lines[0].length / (width + spaces));
  for (let i = 0; i < letters; i++) {
    let letter = lines.map(x => x.substr(i * (width + spaces), width));
    result += alphabet[letter.join("")];
  }
  return result.length === letters ? result : `\n${image.trim()}`;
}
