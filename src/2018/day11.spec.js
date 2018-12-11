const { part1, part2 } = require('./day11');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day11 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('18')).toEqual('33,45');
      expect(part1('42')).toEqual('21,61');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('21,53');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('18')).toEqual('90,269,16');
      expect(part2('42')).toEqual('232,251,12');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual('233,250,12');
    });
  });
});
