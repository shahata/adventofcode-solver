const { part1, part2 } = require('./day11');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day11 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abcdefgh')).toEqual('abcdffaa');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('vzbxxyzz');
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual('vzcaabcc');
    });
  });
});
