import { part1, part2 } from './day04.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day04 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`),
      ).toEqual(2);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(325);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`),
      ).toEqual(3);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(119);
    });
  });
});
