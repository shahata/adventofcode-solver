const { part1, part2 } = require('./day18');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day18 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '.#.#...|#.',
            '.....#|##|',
            '.|..|...#.',
            '..|#.....#',
            '#.#|||#|#|',
            '...#.||...',
            '.|....|...',
            '||...#|.#|',
            '|.||||..|.',
            '...#.|..|.',
          ].join('\n'),
        ),
      ).toEqual(1147);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(483840);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(219919);
    });
  });
});
