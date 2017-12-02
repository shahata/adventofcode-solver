const {day} = require('./day17');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day17', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('ihgpwlah').shift()).to.equal('DDRRRD');
      expect(day('kglvqrro').shift()).to.equal('DDUDRLRRUDRD');
      expect(day('ulqzkmiv').shift()).to.equal('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('RLRDRDUDDR');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('ihgpwlah').pop()).to.equal(370);
      expect(day('kglvqrro').pop()).to.equal(492);
      expect(day('ulqzkmiv').pop()).to.equal(830);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(420);
    });
  });
});
