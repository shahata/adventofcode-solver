const {day} = require('./day13');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day13 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`).shift()).to.equal(330);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(733);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(725);
    });
  });
});
