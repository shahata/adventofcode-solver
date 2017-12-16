const {day} = require('./day25');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day25 2016', () => {
  it('should work for input', () => {
    const [part1, part2] = day(input);
    expect(part1).to.equal(180);
    expect(part2).to.equal(undefined);
  });
});
