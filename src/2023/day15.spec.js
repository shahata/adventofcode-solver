import { part1, part2 } from './day15.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day15 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('HASH')).toEqual(52);
      expect(
        part1('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'),
      ).toEqual(1320);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(519041);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'),
      ).toEqual(145);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(260530);
    });
  });
});
