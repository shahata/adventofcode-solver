const { part1, part2 } = require('./day24');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day24 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`1
2
3
4
5
7
8
9
10
11`),
      ).toEqual(99);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(10723906903);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`1
2
3
4
5
7
8
9
10
11`),
      ).toEqual(44);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(74850409);
    });
  });
});
