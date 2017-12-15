const {day} = require('./day22');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day22 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`Hit Points: 13
Damage: 8`, 10, 250).shift()).to.equal(173 + 53);
      expect(day(`Hit Points: 14
Damage: 8`, 10, 250).shift()).to.equal(229 + 113 + 73 + 173 + 53);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(1824);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1937);
    });
  });
});
