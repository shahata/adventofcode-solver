import { part1, part2 } from './day05.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day05 2015', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('ugknbfddgicrmopn')).toEqual(1);
      expect(part1('aaa')).toEqual(1);
      expect(part1('jchzalrnumimnmhp')).toEqual(0);
      expect(part1('haegwjzuvuyypxyu')).toEqual(0);
      expect(part1('dvszwmarrgswjxmb')).toEqual(0);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(236);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('qjhvhtzxzqqjkmpb')).toEqual(1);
      expect(part2('xxyxx')).toEqual(1);
      expect(part2('uurcxstgmygtbstg')).toEqual(0);
      expect(part2('ieodomkazucvgmuy')).toEqual(0);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(51);
    });
  });
});
