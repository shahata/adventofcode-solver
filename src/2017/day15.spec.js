import { part1, part2 } from './day15.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day15 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          ['Generator A starts with 65', 'Generator B starts with 8921'].join(
            '\n',
          ),
          5,
        ),
      ).toEqual(1);

      expect(
        part1(
          ['Generator A starts with 65', 'Generator B starts with 8921'].join(
            '\n',
          ),
        ),
      ).toEqual(588);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(638);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          ['Generator A starts with 65', 'Generator B starts with 8921'].join(
            '\n',
          ),
          1056,
        ),
      ).toEqual(1);
      expect(
        part2(
          ['Generator A starts with 65', 'Generator B starts with 8921'].join(
            '\n',
          ),
        ),
      ).toEqual(309);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(343);
    });
  });
});
