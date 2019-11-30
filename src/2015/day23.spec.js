import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day23 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`inc b
jio b, +2
tpl b
inc b`),
      ).toEqual(2);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(255);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(334);
    });
  });
});
