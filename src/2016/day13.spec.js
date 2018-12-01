const { part1, part2 } = require('./day13');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day13 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('10', { x: 7, y: 4 })).to.equal(11);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(90);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(135);
    });
  });
});
