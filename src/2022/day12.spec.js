import { part1, part2 } from './day12.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day12 2022', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          ['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'].join(
            '\n',
          ),
        ),
      ).toEqual(31);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(517);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          ['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'].join(
            '\n',
          ),
        ),
      ).toEqual(29);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(512);
    });
  });
});
