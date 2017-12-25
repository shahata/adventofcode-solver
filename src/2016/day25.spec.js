const {part1, part2} = require('./day25');
const {describeHeavy} = require('describe-heavy');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describeHeavy('day25 2016', () => {
  it('should work for input', () => {
    expect(part1(input)).to.equal(180);
    expect(part2(input)).to.equal(undefined);
  });
});
