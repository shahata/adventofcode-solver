const { part1, part2 } = require('./day21');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day21 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`,
          2,
        ),
      ).toEqual(12);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(144);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(2169301);
    });
  });
});
