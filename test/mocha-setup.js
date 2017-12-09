global.itHeavy = function () {
  if (process.env.WIX_NODE_BUILD_WATCH_MODE) {
    it.skip.apply(this, arguments);
  } else {
    it.apply(this, arguments);
  }
};
