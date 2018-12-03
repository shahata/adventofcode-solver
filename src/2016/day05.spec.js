const { day } = require('./day05');
const { describeHeavy } = require('describe-heavy');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describeHeavy('day05 2016', () => {
  it('should work for examples', () => {
    const { part1, part2 } = day('abc');
    expect(part1).toEqual('18f47a30');
    expect(part2).toEqual('05ace8e3');
  });

  it('should work for input', () => {
    const { part1, part2 } = day(input);
    expect(part1).toEqual('f97c354d');
    expect(part2).toEqual('863dde27');
  });
});
