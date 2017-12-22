const readInput = require('../utils/read-input');
const {part1, part2} = require('./day01');
const {expect} = require('chai');
const input = readInput(__filename);

describe('day01 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('1122')).to.equal(3);
      expect(part1('1111')).to.equal(4);
      expect(part1('1234')).to.equal(0);
      expect(part1('91212129')).to.equal(9);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(1136);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('1212')).to.equal(6);
      expect(part2('1221')).to.equal(0);
      expect(part2('123425')).to.equal(4);
      expect(part2('123123')).to.equal(12);
      expect(part2('12131415')).to.equal(4);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1092);
    });
  });
});
