import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day24 2019', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(14539258);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(['....#', '#..#.', '#..##', '..#..', '#....'].join('\n'), 10),
      ).toEqual(99);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1977);
    });
  });
});
