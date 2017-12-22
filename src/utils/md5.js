const crypto = require('crypto');

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

module.exports = md5;
