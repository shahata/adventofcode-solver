import { part1, part2 } from './day13.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day13 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('10', { x: 7, y: 4 })).toEqual(11);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(90);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(135);
    });
  });
});
