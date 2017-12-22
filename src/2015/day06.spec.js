const {part1, part2} = require('./day06');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day06 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`)).to.equal(1000000 - 1000 - 4);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(400410);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('turn on 0,0 through 0,0')).to.equal(1);
      expect(part2('toggle 0,0 through 999,999')).to.equal(2000000);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(15343601);
    });
  });
});
