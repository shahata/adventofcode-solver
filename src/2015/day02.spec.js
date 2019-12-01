import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day02 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('2x3x4\n1x1x10')).toEqual(101);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1588178);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('2x3x4\n1x1x10')).toEqual(48);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(3783758);
    });
  });
});
