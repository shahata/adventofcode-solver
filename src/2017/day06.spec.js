import { day } from './day06.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day06 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('0 2 7 0').part1).toEqual(5);
    });

    it('should work for part 1 input', () => {
      expect(day(input).part1).toEqual(12841);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('0 2 7 0').part2).toEqual(4);
    });

    it('should work for part 2 input', () => {
      expect(day(input).part2).toEqual(8038);
    });
  });
});
