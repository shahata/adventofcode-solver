import { part1, part2 } from './day22.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day22 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('..#\n#..\n...', 7)).toEqual(5);
      expect(part1('..#\n#..\n...', 70)).toEqual(41);
      expect(part1('..#\n#..\n...')).toEqual(5587);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(5339);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('..#\n#..\n...', 100)).toEqual(26);
      expect(part2('..#\n#..\n...')).toEqual(2511944);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(2512380);
    });
  });
});
