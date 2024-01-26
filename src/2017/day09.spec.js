import { part1, part2 } from './day09.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day09 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('{}')).toEqual(1);
      expect(part1('{{{}}}')).toEqual(6);
      expect(part1('{{},{}}')).toEqual(5);
      expect(part1('{{{},{},{{}}}}')).toEqual(16);
      expect(part1('{<a>,<a>,<a>,<a>}')).toEqual(1);
      expect(part1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual(9);
      expect(part1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toEqual(9);
      expect(part1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toEqual(3);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(20530);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('<>')).toEqual(0);
      expect(part2('<random characters>')).toEqual(17);
      expect(part2('<<<<>')).toEqual(3);
      expect(part2('<{!>}>')).toEqual(2);
      expect(part2('<!!>')).toEqual(0);
      expect(part2('<!!!>>')).toEqual(0);
      expect(part2('<{o"i!a,<{i<a>')).toEqual(10);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(9978);
    });
  });
});
