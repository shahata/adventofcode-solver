import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day20 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'broadcaster -> a, b, c',
            '%a -> b',
            '%b -> c',
            '%c -> inv',
            '&inv -> a',
          ].join('\n'),
        ),
      ).toEqual(32000000);

      expect(
        part1(
          [
            'broadcaster -> a',
            '%a -> inv, con',
            '&inv -> b',
            '%b -> con',
            '&con -> output',
          ].join('\n'),
        ),
      ).toEqual(11687500);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(861743850);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(247023644760071);
    });
  });
});
