import { part1, part2 } from './day08.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day08 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual(138);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(36891);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual(66);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(20083);
    });
  });
});
