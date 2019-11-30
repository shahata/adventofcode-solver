import { part1, part2 } from './day07.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day07 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('123 -> x\n456 -> y\nx AND y -> a')).toEqual(72);
      expect(part1(`123 -> x\n456 -> y\nx OR y -> a`)).toEqual(507);
      expect(part1(`123 -> x\n456 -> y\nx LSHIFT 2 -> a`)).toEqual(492);
      expect(part1(`123 -> x\n456 -> y\ny RSHIFT 2 -> a`)).toEqual(114);
      expect(part1(`123 -> x\n456 -> y\nNOT x -> a`)).toEqual(65412);
      expect(part1(`123 -> x\n456 -> y\nNOT y -> a`)).toEqual(65079);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(16076);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(2797);
    });
  });
});
