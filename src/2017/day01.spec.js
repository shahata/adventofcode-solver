const readInput = require('../utils/read-input');
const {day} = require('./day01');
const {expect} = require('chai');
const input = readInput(__filename);

describe('day01 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('1122').shift()).to.equal(3);
      expect(day('1111').shift()).to.equal(4);
      expect(day('1234').shift()).to.equal(0);
      expect(day('91212129').shift()).to.equal(9);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(1136);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('1212').pop()).to.equal(6);
      expect(day('1221').pop()).to.equal(0);
      expect(day('123425').pop()).to.equal(4);
      expect(day('123123').pop()).to.equal(12);
      expect(day('12131415').pop()).to.equal(4);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1092);
    });
  });
});
