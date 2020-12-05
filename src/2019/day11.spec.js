import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day11 2019', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(2339);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(
        [
          '',
          ' ###   ##  #  # #### ###  #    ###  ###  ',
          ' #  # #  # #  # #    #  # #    #  # #  # ',
          ' #  # #    #  # ###  #  # #    #  # #  # ',
          ' ###  # ## #  # #    ###  #    ###  ###  ',
          ' #    #  # #  # #    #    #    #    # #  ',
          ' #     ###  ##  #### #    #### #    #  # ',
        ].join('\n'),
      );
    });
  });
});
