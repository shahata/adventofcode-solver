import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day02 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'forward 5',
            'down 5',
            'forward 8',
            'up 3',
            'down 8',
            'forward 2',
          ].join('\n'),
        ),
      ).toEqual(150);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1561344);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'forward 5',
            'down 5',
            'forward 8',
            'up 3',
            'down 8',
            'forward 2',
          ].join('\n'),
        ),
      ).toEqual(900);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1848454425);
    });
  });
});
