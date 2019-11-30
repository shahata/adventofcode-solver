import { part1, part2 } from './day13.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day13 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '/->-\\        ',
            '|   |  /----\\',
            '| /-+--+-\\  |',
            '| | |  | v  |',
            '\\-+-/  \\-+--/',
            '  \\------/   ',
          ].join('\n'),
        ),
      ).toEqual('7,3');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('94,78');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '/>-<\\  ',
            '|   |  ',
            '| /<+-\\',
            '| | | v',
            '\\>+</ |',
            '  |   ^',
            '  \\<->/',
          ].join('\n'),
        ),
      ).toEqual('6,4');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual('26,85');
    });
  });
});
