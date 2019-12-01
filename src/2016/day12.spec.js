import { part1, part2 } from './day12.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day12 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`),
      ).toEqual(42);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(317993);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(9227647);
    });
  });
});
