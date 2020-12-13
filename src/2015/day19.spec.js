import { part1, part2 } from './day19.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day19 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(['H => HO', 'H => OH', 'O => HH', '', 'HOH'].join('\n')),
      ).toEqual(4);
      expect(
        part1(['H => HO', 'H => OH', 'O => HH', '', 'HOHOHO'].join('\n')),
      ).toEqual(7);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(576);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          ['e => H', 'e => O', 'H => HO', 'H => OH', 'O => HH', '', 'HOH'].join(
            '\n',
          ),
        ),
      ).toEqual(3);
      expect(
        part2(
          [
            'e => H',
            'e => O',
            'H => HO',
            'H => OH',
            'O => HH',
            '',
            'HOHOHO',
          ].join('\n'),
        ),
      ).toEqual(6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(207);
    });
  });
});
