import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day23 2017', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(4225);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(905);
    });
  });
});
