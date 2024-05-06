import { part1, part2 } from './day08.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day08 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(['30373', '25512', '65332', '33549', '35390'].join('\n')),
      ).toEqual(21);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1662);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(['30373', '25512', '65332', '33549', '35390'].join('\n')),
      ).toEqual(8);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(537600);
    });
  });
});
