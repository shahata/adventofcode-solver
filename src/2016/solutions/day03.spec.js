const fs = require('fs');
const day = require('./day03');
const {expect} = require('chai');
const input = fs.readFileSync(`${__dirname}/day03.txt`).toString();

describe('day03', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('5 10 25\n5 10 7\n5 10 2').shift()).to.equal(1);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(862);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('101 301 501\n102 302 502\n103 303 503\n201 401 601\n202 402 602\n203 403 603').pop()).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1577);
    });
  });
});
