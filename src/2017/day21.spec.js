import { part1, part2 } from './day21.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day21 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#`, 2),
      ).toEqual(12);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(144);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(2169301);
    });
  });
});
