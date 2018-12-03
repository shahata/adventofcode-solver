const { part1, part2 } = require('./day16');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day16 2015', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(213);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(323);
    });
  });
});
