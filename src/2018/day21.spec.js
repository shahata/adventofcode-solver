const { part1, part2 } = require('./day21');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day21 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      // expect(part1('1')).toEqual(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(212115);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(9258470);
    });
  });
});
