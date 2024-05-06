import { part1, part2 } from './day16.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day16 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('12345678', 4)).toEqual('01029498');
      expect(part1('80871224585914546619083218645595')).toEqual('24176176');
      expect(part1('19617804207202209144916044189917')).toEqual('73745418');
      expect(part1('69317163492948606335995924319873')).toEqual('52432133');
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual('28430146');
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('03036732577212944063491565474664')).toEqual('84462026');
      expect(part2('02935109699940807407585447034323')).toEqual('78725270');
      expect(part2('03081770884921959731165446850517')).toEqual('53553731');
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual('12064286');
    });
  });
});
