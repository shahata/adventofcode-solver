import { part1, part2 } from './day15.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day15 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`),
      ).toEqual(5);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(376777);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(3903937);
    });
  });
});
