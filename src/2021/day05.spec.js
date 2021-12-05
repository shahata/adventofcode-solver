import { part1, part2 } from './day05.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day05 2021', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '0,9 -> 5,9',
            '8,0 -> 0,8',
            '9,4 -> 3,4',
            '2,2 -> 2,1',
            '7,0 -> 7,4',
            '6,4 -> 2,0',
            '0,9 -> 2,9',
            '3,4 -> 1,4',
            '0,0 -> 8,8',
            '5,5 -> 8,2',
          ].join('\n'),
        ),
      ).toEqual(5);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(6856);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '0,9 -> 5,9',
            '8,0 -> 0,8',
            '9,4 -> 3,4',
            '2,2 -> 2,1',
            '7,0 -> 7,4',
            '6,4 -> 2,0',
            '0,9 -> 2,9',
            '3,4 -> 1,4',
            '0,0 -> 8,8',
            '5,5 -> 8,2',
          ].join('\n'),
        ),
      ).toEqual(12);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(20666);
    });
  });
});
