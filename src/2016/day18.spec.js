import { part1, part2 } from './day18.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day18 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('..^^.', 3)).toEqual(6);
      expect(part1('.^^.^.^^^^', 10)).toEqual(38);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1951);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(20002936);
    });
  });
});
