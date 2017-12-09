const {day} = require('./day07');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day07 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`).shift()).to.equal('tknk');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('aapssr');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`).pop()).to.equal(60);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1458);
    });
  });
});
