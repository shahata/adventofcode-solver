import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day11 2016', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
            'The second floor contains a hydrogen generator.',
            'The third floor contains a lithium generator.',
            'The fourth floor contains nothing relevant.',
          ].join('\n'),
        ),
      ).toEqual(11);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(33);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(57);
    });
  });
});
