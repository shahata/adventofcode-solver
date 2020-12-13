import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day01 2019', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('12')).toEqual(2);
      expect(part1('14')).toEqual(2);
      expect(part1('1969')).toEqual(654);
      expect(part1('100756')).toEqual(33583);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(3287899);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('14')).toEqual(2);
      expect(part2('1969')).toEqual(966);
      expect(part2('100756')).toEqual(50346);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(4928963);
    });
  });
});
