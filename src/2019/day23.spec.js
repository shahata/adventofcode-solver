import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day23 2019', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      // expect(part1('1')).toEqual(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(18513);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(13286);
    });
  });
});
