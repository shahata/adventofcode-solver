import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day23 2018', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'pos=<0,0,0>, r=4',
            'pos=<1,0,0>, r=1',
            'pos=<4,0,0>, r=3',
            'pos=<0,2,0>, r=1',
            'pos=<0,5,0>, r=3',
            'pos=<0,0,3>, r=1',
            'pos=<1,1,1>, r=1',
            'pos=<1,1,2>, r=1',
            'pos=<1,3,1>, r=1',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(933);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'pos=<10,12,12>, r=2',
            'pos=<12,14,12>, r=2',
            'pos=<16,12,12>, r=4',
            'pos=<14,14,14>, r=6',
            'pos=<50,50,50>, r=200',
            'pos=<10,10,10>, r=5',
          ].join('\n'),
        ),
      ).toEqual(36);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(70887840);
    });
  });
});
