const { part1, part2 } = require('./day05');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day05 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('dabAcCaCBAcCcaDA')).toEqual(10);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(10638);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('dabAcCaCBAcCcaDA')).toEqual(4);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(4944);
    });
  });
});
