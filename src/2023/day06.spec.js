import { part1, part2 } from './day06.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day06 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(['Time:      7  15   30', 'Distance:  9  40  200'].join('\n')),
      ).toEqual(288);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(293046);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(['Time:      7  15   30', 'Distance:  9  40  200'].join('\n')),
      ).toEqual(71503);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(35150181);
    });
  });
});
