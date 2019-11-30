import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day03 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'].join('\n')),
      ).toEqual(4);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(109143);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'].join('\n')),
      ).toEqual(3);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(506);
    });
  });
});
