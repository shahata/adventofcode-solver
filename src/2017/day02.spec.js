const { part1, part2 } = require('./day02');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day02 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`5 1 9 5
7 5 3
2 4 6 8`),
      ).toEqual(18);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(41887);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`5 9 2 8
9 4 7 3
3 8 6 5`),
      ).toEqual(9);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(226);
    });
  });
});
