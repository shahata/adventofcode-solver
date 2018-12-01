const { part1, part2 } = require('./day10');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day10 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('1', 1)).to.equal(2);
      expect(part1('11', 1)).to.equal(2);
      expect(part1('21', 1)).to.equal(4);
      expect(part1('1211', 1)).to.equal(6);
      expect(part1('111221', 1)).to.equal(6);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(252594);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(3579328);
    });
  });
});
