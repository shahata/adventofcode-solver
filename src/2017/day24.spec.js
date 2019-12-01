import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day24 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'].join('\n'),
        ),
      ).toEqual(31);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1906);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'].join('\n'),
        ),
      ).toEqual(19);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1824);
    });
  });
});
