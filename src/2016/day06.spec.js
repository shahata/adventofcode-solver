const { part1, part2 } = require('./day06');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day06 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`eedadn
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
enarar`),
      ).toEqual('easter');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('qzedlxso');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`eedadn
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
enarar`),
      ).toEqual('advent');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual('ucmifjae');
    });
  });
});
