const {part1, part2} = require('./day13');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day13 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`0: 3
1: 2
4: 4
6: 4`)).to.equal(24);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(3184);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(`0: 3
1: 2
4: 4
6: 4`)).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(3878062);
    });
  });
});
