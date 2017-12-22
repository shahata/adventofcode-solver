const {day} = require('./day15');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day15 2015', () => {
  it('should work for example', () => {
    const [part1, part2] = day(`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`);
    expect(part1).to.equal(62842880);
    expect(part2).to.equal(57600000);
  });

  it('should work for input', () => {
    const [part1, part2] = day(input);
    expect(part1).to.equal(13882464);
    expect(part2).to.equal(11171160);
  });
});
