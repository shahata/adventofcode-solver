const { part1, part2 } = require('./day09');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day09 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('ADVENT')).toEqual('ADVENT'.length);
      expect(part1('A(1x5)BC')).toEqual('ABBBBBC'.length);
      expect(part1('(3x3)XYZ')).toEqual('XYZXYZXYZ'.length);
      expect(part1('(6x1)(1x3)A')).toEqual('(1x3)A'.length);
      expect(part1('X(8x2)(3x3)ABCY')).toEqual('X(3x3)ABC(3x3)ABCY'.length);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(74532);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('(3x3)XYZ')).toEqual('XYZXYZXYZ'.length);
      expect(part2('X(8x2)(3x3)ABCY')).toEqual('XABCABCABCABCABCABCY'.length);
      expect(part2('(27x12)(20x12)(13x14)(7x10)(1x12)A')).toEqual(241920);
      expect(
        part2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'),
      ).toEqual(445);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(11558231665);
    });
  });
});
