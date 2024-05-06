import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day02 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('1,9,10,3,2,3,11,0,99,30,40,50', 9, 10)).toEqual(3500);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(5098658);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(5064);
    });
  });
});
