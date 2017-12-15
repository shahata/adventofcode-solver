const {day} = require('./day25');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day25 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('row 1, column 1.').shift()).to.equal(20151125);
      expect(day('row 2, column 1.').shift()).to.equal(31916031);
      expect(day('row 3, column 1.').shift()).to.equal(16080970);
      expect(day('row 4, column 1.').shift()).to.equal(24592653);
      expect(day('row 5, column 1.').shift()).to.equal(77061);
      expect(day('row 6, column 1.').shift()).to.equal(33071741);

      expect(day('row 1, column 2.').shift()).to.equal(18749137);
      expect(day('row 2, column 2.').shift()).to.equal(21629792);
      expect(day('row 3, column 2.').shift()).to.equal(8057251);
      expect(day('row 4, column 2.').shift()).to.equal(32451966);
      expect(day('row 5, column 2.').shift()).to.equal(17552253);
      expect(day('row 6, column 2.').shift()).to.equal(6796745);

      expect(day('row 1, column 3.').shift()).to.equal(17289845);
      expect(day('row 2, column 3.').shift()).to.equal(16929656);
      expect(day('row 3, column 3.').shift()).to.equal(1601130);
      expect(day('row 4, column 3.').shift()).to.equal(21345942);
      expect(day('row 5, column 3.').shift()).to.equal(28094349);
      expect(day('row 6, column 3.').shift()).to.equal(25397450);

      expect(day('row 1, column 4.').shift()).to.equal(30943339);
      expect(day('row 2, column 4.').shift()).to.equal(7726640);
      expect(day('row 3, column 4.').shift()).to.equal(7981243);
      expect(day('row 4, column 4.').shift()).to.equal(9380097);
      expect(day('row 5, column 4.').shift()).to.equal(6899651);
      expect(day('row 6, column 4.').shift()).to.equal(24659492);

      expect(day('row 1, column 5.').shift()).to.equal(10071777);
      expect(day('row 2, column 5.').shift()).to.equal(15514188);
      expect(day('row 3, column 5.').shift()).to.equal(11661866);
      expect(day('row 4, column 5.').shift()).to.equal(10600672);
      expect(day('row 5, column 5.').shift()).to.equal(9250759);
      expect(day('row 6, column 5.').shift()).to.equal(1534922);

      expect(day('row 1, column 6.').shift()).to.equal(33511524);
      expect(day('row 2, column 6.').shift()).to.equal(4041754);
      expect(day('row 3, column 6.').shift()).to.equal(16474243);
      expect(day('row 4, column 6.').shift()).to.equal(31527494);
      expect(day('row 5, column 6.').shift()).to.equal(31663883);
      expect(day('row 6, column 6.').shift()).to.equal(27995004);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(9132360);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(undefined);
    });
  });
});
