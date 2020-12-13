import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day11 2020', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'L.LL.LL.LL',
            'LLLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLLL',
            'L.LLLLLL.L',
            'L.LLLLL.LL',
          ].join('\n'),
        ),
      ).toEqual(37);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(2418);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            'L.LL.LL.LL',
            'LLLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLLL',
            'L.LLLLLL.L',
            'L.LLLLL.LL',
          ].join('\n'),
        ),
      ).toEqual(26);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(2144);
    });
  });
});
