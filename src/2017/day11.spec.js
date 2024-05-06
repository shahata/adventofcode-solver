import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day11 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('ne,ne,ne')).toEqual(3);
      expect(part1('ne,ne,sw,sw')).toEqual(0);
      expect(part1('ne,ne,s,s')).toEqual(2);
      expect(part1('se,sw,se,sw,sw')).toEqual(3);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(747);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1544);
    });
  });
});
