import { part1, part2 } from './day25.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day25 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('row 1, column 1.')).toEqual(20151125);
      expect(part1('row 2, column 1.')).toEqual(31916031);
      expect(part1('row 3, column 1.')).toEqual(16080970);
      expect(part1('row 4, column 1.')).toEqual(24592653);
      expect(part1('row 5, column 1.')).toEqual(77061);
      expect(part1('row 6, column 1.')).toEqual(33071741);

      expect(part1('row 1, column 2.')).toEqual(18749137);
      expect(part1('row 2, column 2.')).toEqual(21629792);
      expect(part1('row 3, column 2.')).toEqual(8057251);
      expect(part1('row 4, column 2.')).toEqual(32451966);
      expect(part1('row 5, column 2.')).toEqual(17552253);
      expect(part1('row 6, column 2.')).toEqual(6796745);

      expect(part1('row 1, column 3.')).toEqual(17289845);
      expect(part1('row 2, column 3.')).toEqual(16929656);
      expect(part1('row 3, column 3.')).toEqual(1601130);
      expect(part1('row 4, column 3.')).toEqual(21345942);
      expect(part1('row 5, column 3.')).toEqual(28094349);
      expect(part1('row 6, column 3.')).toEqual(25397450);

      expect(part1('row 1, column 4.')).toEqual(30943339);
      expect(part1('row 2, column 4.')).toEqual(7726640);
      expect(part1('row 3, column 4.')).toEqual(7981243);
      expect(part1('row 4, column 4.')).toEqual(9380097);
      expect(part1('row 5, column 4.')).toEqual(6899651);
      expect(part1('row 6, column 4.')).toEqual(24659492);

      expect(part1('row 1, column 5.')).toEqual(10071777);
      expect(part1('row 2, column 5.')).toEqual(15514188);
      expect(part1('row 3, column 5.')).toEqual(11661866);
      expect(part1('row 4, column 5.')).toEqual(10600672);
      expect(part1('row 5, column 5.')).toEqual(9250759);
      expect(part1('row 6, column 5.')).toEqual(1534922);

      expect(part1('row 1, column 6.')).toEqual(33511524);
      expect(part1('row 2, column 6.')).toEqual(4041754);
      expect(part1('row 3, column 6.')).toEqual(16474243);
      expect(part1('row 4, column 6.')).toEqual(31527494);
      expect(part1('row 5, column 6.')).toEqual(31663883);
      expect(part1('row 6, column 6.')).toEqual(27995004);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(9132360);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
