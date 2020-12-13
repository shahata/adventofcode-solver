import { part1, part2 } from './day12.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day12 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '0 <-> 2',
            '1 <-> 1',
            '2 <-> 0, 3, 4',
            '3 <-> 2, 4',
            '4 <-> 2, 3, 6',
            '5 <-> 6',
            '6 <-> 4, 5',
          ].join('\n'),
        ),
      ).toEqual(6);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(175);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '0 <-> 2',
            '1 <-> 1',
            '2 <-> 0, 3, 4',
            '3 <-> 2, 4',
            '4 <-> 2, 3, 6',
            '5 <-> 6',
            '6 <-> 4, 5',
          ].join('\n'),
        ),
      ).toEqual(2);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(213);
    });
  });
});
