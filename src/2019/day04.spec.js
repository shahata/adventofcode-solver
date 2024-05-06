import { part1, part2 } from './day04.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day04 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('111111-111111')).toEqual(1);
      expect(part1('223450-223450')).toEqual(0);
      expect(part1('123789-123789')).toEqual(0);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1650);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('112233-112233')).toEqual(1);
      expect(part2('123444-123444')).toEqual(0);
      expect(part2('111122-111122')).toEqual(1);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1129);
    });
  });
});
