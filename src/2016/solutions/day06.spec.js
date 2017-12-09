const {day} = require('./day06');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day06 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`).shift()).to.equal('easter');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('qzedlxso');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`).pop()).to.equal('advent');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('ucmifjae');
    });
  });
});
