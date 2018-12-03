const { part1, part2 } = require('./day24');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day24 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`),
      ).toEqual(31);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1906);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`),
      ).toEqual(19);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1824);
    });
  });
});
