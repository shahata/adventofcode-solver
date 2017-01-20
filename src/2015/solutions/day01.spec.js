const day = require('./day01.js');
const {expect} = require('chai');

describe('day01', () => {
  it('should work for part 1', () => {
    expect(day('()()').shift()).to.equal(0);
  });

  it('should work for part 2', () => {
    expect(day('()())()').pop()).to.equal(5);
  });
});
