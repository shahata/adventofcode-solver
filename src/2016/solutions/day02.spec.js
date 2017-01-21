const fs = require('fs');
const day = require('./day02');
const {expect} = require('chai');
const input = fs.readFileSync(`${__dirname}/day02.txt`).toString();

describe('day02', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('ULL\nRRDDD\nLURDL\nUUUUD').shift()).to.equal('1985');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('65556');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('ULL\nRRDDD\nLURDL\nUUUUD').pop()).to.equal('5DB3');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('CB779');
    });
  });
});
