const {part1, part2} = require('./day12');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day12 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('[1,2,3]')).to.equal(6);
      expect(part1('{"a":2,"b":4}')).to.equal(6);
      expect(part1('[[[3]]]')).to.equal(3);
      expect(part1('{"a":{"b":4},"c":-1}')).to.equal(3);
      expect(part1('{"a":[-1,1]}')).to.equal(0);
      expect(part1('[-1,{"a":1}]')).to.equal(0);
      expect(part1('[]')).to.equal(0);
      expect(part1('{}')).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(119433);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('[1,2,3]')).to.equal(6);
      expect(part2('[1,{"c":"red","b":2},3]')).to.equal(4);
      expect(part2('{"d":"red","e":[1,2,3,4],"f":5}')).to.equal(0);
      expect(part2('[1,"red",5]')).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(68466);
    });
  });
});
