const { part1, part2 } = require('./day25');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day25 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('row 1, column 1.')).to.equal(20151125);
      expect(part1('row 2, column 1.')).to.equal(31916031);
      expect(part1('row 3, column 1.')).to.equal(16080970);
      expect(part1('row 4, column 1.')).to.equal(24592653);
      expect(part1('row 5, column 1.')).to.equal(77061);
      expect(part1('row 6, column 1.')).to.equal(33071741);

      expect(part1('row 1, column 2.')).to.equal(18749137);
      expect(part1('row 2, column 2.')).to.equal(21629792);
      expect(part1('row 3, column 2.')).to.equal(8057251);
      expect(part1('row 4, column 2.')).to.equal(32451966);
      expect(part1('row 5, column 2.')).to.equal(17552253);
      expect(part1('row 6, column 2.')).to.equal(6796745);

      expect(part1('row 1, column 3.')).to.equal(17289845);
      expect(part1('row 2, column 3.')).to.equal(16929656);
      expect(part1('row 3, column 3.')).to.equal(1601130);
      expect(part1('row 4, column 3.')).to.equal(21345942);
      expect(part1('row 5, column 3.')).to.equal(28094349);
      expect(part1('row 6, column 3.')).to.equal(25397450);

      expect(part1('row 1, column 4.')).to.equal(30943339);
      expect(part1('row 2, column 4.')).to.equal(7726640);
      expect(part1('row 3, column 4.')).to.equal(7981243);
      expect(part1('row 4, column 4.')).to.equal(9380097);
      expect(part1('row 5, column 4.')).to.equal(6899651);
      expect(part1('row 6, column 4.')).to.equal(24659492);

      expect(part1('row 1, column 5.')).to.equal(10071777);
      expect(part1('row 2, column 5.')).to.equal(15514188);
      expect(part1('row 3, column 5.')).to.equal(11661866);
      expect(part1('row 4, column 5.')).to.equal(10600672);
      expect(part1('row 5, column 5.')).to.equal(9250759);
      expect(part1('row 6, column 5.')).to.equal(1534922);

      expect(part1('row 1, column 6.')).to.equal(33511524);
      expect(part1('row 2, column 6.')).to.equal(4041754);
      expect(part1('row 3, column 6.')).to.equal(16474243);
      expect(part1('row 4, column 6.')).to.equal(31527494);
      expect(part1('row 5, column 6.')).to.equal(31663883);
      expect(part1('row 6, column 6.')).to.equal(27995004);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(9132360);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(undefined);
    });
  });
});
