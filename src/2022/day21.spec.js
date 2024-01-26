import { part1, part2 } from './day21.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day21 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'root: pppw + sjmn',
            'dbpl: 5',
            'cczh: sllz + lgvd',
            'zczc: 2',
            'ptdq: humn - dvpt',
            'dvpt: 3',
            'lfqf: 4',
            'humn: 5',
            'ljgn: 2',
            'sjmn: drzm * dbpl',
            'sllz: 4',
            'pppw: cczh / lfqf',
            'lgvd: ljgn * ptdq',
            'drzm: hmdt - zczc',
            'hmdt: 32',
          ].join('\n'),
        ),
      ).toEqual(152);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(170237589447588);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'root: pppw + sjmn',
            'dbpl: 5',
            'cczh: sllz + lgvd',
            'zczc: 2',
            'ptdq: humn - dvpt',
            'dvpt: 3',
            'lfqf: 4',
            'humn: 5',
            'ljgn: 2',
            'sjmn: drzm * dbpl',
            'sllz: 4',
            'pppw: cczh / lfqf',
            'lgvd: ljgn * ptdq',
            'drzm: hmdt - zczc',
            'hmdt: 32',
          ].join('\n'),
        ),
      ).toEqual(301);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(3712643961892);
    });
  });
});
