const {day} = require('./day17');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day17 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`20
15
10
5
5`, 25).shift()).to.equal(4);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(654);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`20
15
10
5
5`, 25).pop()).to.equal(3);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(57);
    });
  });
});
