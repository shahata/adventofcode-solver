import { part1, part2 } from './day07.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day07 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('16,1,2,0,4,2,7,1,2,14')).toEqual(37);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(342641);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('16,1,2,0,4,2,7,1,2,14')).toEqual(168);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(93006301);
    });
  });
});
