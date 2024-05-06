import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day20 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1(['1', '2', '-3', '3', '-2', '0', '4'].join('\n'))).toEqual(
        '1, 2, -3, 4, 0, 3, -2',
      );
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(11037);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['1', '2', '-3', '3', '-2', '0', '4'].join('\n'))).toEqual(
        '0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153',
      );
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(3033720253914);
    });
  });
});
