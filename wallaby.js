module.exports = function(wallaby) {
  const wallabyCommon = require('yoshi/config/wallaby-jest')(wallaby);
  delete wallabyCommon.workers;
  delete wallabyCommon.compilers;
  wallabyCommon.tests = [{ pattern: 'src/2018/day25.spec.js' }];
  return wallabyCommon;
};
