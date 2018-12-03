const { part1, part2 } = require('./day01');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day01 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('()()')).toEqual(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(74);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('()())()')).toEqual(5);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1795);
    });
  });
});
