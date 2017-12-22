const {part1, part2} = require('./day03');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day03 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('5 10 25\n5 10 7\n5 10 2')).to.equal(1);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(862);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('101 301 501\n102 302 502\n103 303 503\n201 401 601\n202 402 602\n203 403 603')).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1577);
    });
  });
});
