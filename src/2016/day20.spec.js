import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day20 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('5-8\n0-2\n4-7')).toEqual(3);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(14975795);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(101);
    });
  });
});
