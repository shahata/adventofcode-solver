import { part1, part2 } from './day06.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day06 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7);
      expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5);
      expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6);
      expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10);
      expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1892);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(19);
      expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23);
      expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23);
      expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29);
      expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(2313);
    });
  });
});
