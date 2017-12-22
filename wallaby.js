module.exports = function (wallaby) {
  const wallabyCommon = require('haste-preset-yoshi/config/wallaby-mocha')(wallaby);
  delete wallabyCommon.workers;
  delete wallabyCommon.compilers;
  return wallabyCommon;
};
