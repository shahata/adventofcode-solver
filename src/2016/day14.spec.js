import { part1, part2 } from './day14.js';
import { describeHeavy } from 'describe-heavy';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day14 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abc')).toEqual(22728);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(23769);
    });
  });

  describeHeavy('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('abc')).toEqual(22551);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(20606);
    });
  });
});
