const { part1, part2 } = require('./day25');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day25 2018', () => {
  describe('part1', () => {
    it('should work for part 1 example 1', () => {
      expect(
        part1(
          [
            '0,0,0,0',
            '3,0,0,0',
            '0,3,0,0',
            '0,0,3,0',
            '0,0,0,3',
            '0,0,0,6',
            '9,0,0,0',
            '12,0,0,0',
          ].join('\n'),
        ),
      ).toEqual(2);
    });

    it('should work for part 1 example 2', () => {
      expect(
        part1(
          [
            '-1,2,2,0',
            '0,0,2,-2',
            '0,0,0,-2',
            '-1,2,0,0',
            '-2,-2,-2,2',
            '3,0,2,-1',
            '-1,3,2,2',
            '-1,0,-1,0',
            '0,2,1,-2',
            '3,0,0,0',
          ].join('\n'),
        ),
      ).toEqual(4);
    });

    it('should work for part 1 example 3', () => {
      expect(
        part1(
          [
            '1,-1,0,1',
            '2,0,-1,0',
            '3,2,-1,0',
            '0,0,3,1',
            '0,0,-1,-1',
            '2,3,-2,0',
            '-2,2,0,0',
            '2,-2,0,-1',
            '1,-1,0,-1',
            '3,2,0,2',
          ].join('\n'),
        ),
      ).toEqual(3);
    });

    it('should work for part 1 example 4', () => {
      expect(
        part1(
          [
            '1,-1,-1,-2',
            '-2,-2,0,1',
            '0,2,1,3',
            '-2,3,-2,1',
            '0,2,3,-2',
            '-1,-1,1,-2',
            '0,-2,-1,0',
            '-2,2,3,-1',
            '1,2,2,0',
            '-1,-2,0,-2',
          ].join('\n'),
        ),
      ).toEqual(8);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(375);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(input)).toEqual(undefined);
    });
  });
});
