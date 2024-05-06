import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day11 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'Monkey 0:',
            '  Starting items: 79, 98',
            '  Operation: new = old * 19',
            '  Test: divisible by 23',
            '    If true: throw to monkey 2',
            '    If false: throw to monkey 3',
            '',
            'Monkey 1:',
            '  Starting items: 54, 65, 75, 74',
            '  Operation: new = old + 6',
            '  Test: divisible by 19',
            '    If true: throw to monkey 2',
            '    If false: throw to monkey 0',
            '',
            'Monkey 2:',
            '  Starting items: 79, 60, 97',
            '  Operation: new = old * old',
            '  Test: divisible by 13',
            '    If true: throw to monkey 1',
            '    If false: throw to monkey 3',
            '',
            'Monkey 3:',
            '  Starting items: 74',
            '  Operation: new = old + 3',
            '  Test: divisible by 17',
            '    If true: throw to monkey 0',
            '    If false: throw to monkey 1',
          ].join('\n'),
        ),
      ).toEqual(10605);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(50616);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'Monkey 0:',
            '  Starting items: 79, 98',
            '  Operation: new = old * 19',
            '  Test: divisible by 23',
            '    If true: throw to monkey 2',
            '    If false: throw to monkey 3',
            '',
            'Monkey 1:',
            '  Starting items: 54, 65, 75, 74',
            '  Operation: new = old + 6',
            '  Test: divisible by 19',
            '    If true: throw to monkey 2',
            '    If false: throw to monkey 0',
            '',
            'Monkey 2:',
            '  Starting items: 79, 60, 97',
            '  Operation: new = old * old',
            '  Test: divisible by 13',
            '    If true: throw to monkey 1',
            '    If false: throw to monkey 3',
            '',
            'Monkey 3:',
            '  Starting items: 74',
            '  Operation: new = old + 3',
            '  Test: divisible by 17',
            '    If true: throw to monkey 0',
            '    If false: throw to monkey 1',
          ].join('\n'),
        ),
      ).toEqual(2713310158);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(11309046332);
    });
  });
});
