import { part1, part2 } from './day08.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day08 2019', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('123456789012', 3, 2)).toEqual(1);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1806);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('0222112222120000', 2, 2)).toEqual('\n #\n# ');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(
        [
          '',
          '  ##  ##  #### ###   ##  ',
          '   # #  # #    #  # #  # ',
          '   # #  # ###  #  # #  # ',
          '   # #### #    ###  #### ',
          '#  # #  # #    # #  #  # ',
          ' ##  #  # #    #  # #  # ',
        ].join('\n'),
      );
    });
  });
});
