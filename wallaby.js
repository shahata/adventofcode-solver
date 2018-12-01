module.exports = function(wallaby) {
  const wallabyCommon = require('yoshi/config/wallaby-jest')(wallaby);
  // delete wallabyCommon.workers;
  // delete wallabyCommon.compilers;
  return wallabyCommon;
};
