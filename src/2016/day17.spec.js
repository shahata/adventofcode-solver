const {part1, part2} = require('./day17');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day17 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('ihgpwlah')).to.equal('DDRRRD');
      expect(part1('kglvqrro')).to.equal('DDUDRLRRUDRD');
      expect(part1('ulqzkmiv')).to.equal('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('RLRDRDUDDR');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('ihgpwlah')).to.equal(370);
      expect(part2('kglvqrro')).to.equal(492);
      expect(part2('ulqzkmiv')).to.equal(830);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(420);
    });
  });
});
