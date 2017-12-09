const {day} = require('./day12');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day12 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('[1,2,3]').shift()).to.equal(6);
      expect(day('{"a":2,"b":4}').shift()).to.equal(6);
      expect(day('[[[3]]]').shift()).to.equal(3);
      expect(day('{"a":{"b":4},"c":-1}').shift()).to.equal(3);
      expect(day('{"a":[-1,1]}').shift()).to.equal(0);
      expect(day('[-1,{"a":1}]').shift()).to.equal(0);
      expect(day('[]').shift()).to.equal(0);
      expect(day('{}').shift()).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(119433);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('[1,2,3]').pop()).to.equal(6);
      expect(day('[1,{"c":"red","b":2},3]').pop()).to.equal(4);
      expect(day('{"d":"red","e":[1,2,3,4],"f":5}').pop()).to.equal(0);
      expect(day('[1,"red",5]').pop()).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(68466);
    });
  });
});
