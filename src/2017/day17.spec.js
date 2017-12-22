const {part1, part2} = require('./day17');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day17 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('3')).to.equal(638);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(2000);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part1('3', 0)).to.equal(part2('3', 2017));
      expect(part1(input, 0)).to.equal(part2(input, 2017));
    });

    itHeavy('should work for part 2 input', () => {
      expect(part2(input)).to.equal(10242889);
    });
  });
});
