const day = require('./template.js');
const {expect} = require('chai');

describe('template', () => {
  it('should work for part 1', () => {
    expect(day('()()').shift()).to.equal('()()');
  });

  it('should work for part 2', () => {
    expect(day('()()').pop()).to.equal('()()');
  });
});
