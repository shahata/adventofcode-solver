global.describeHeavy = function () {
  if (process.env.WIX_NODE_BUILD_WATCH_MODE) {
    describe.skip.apply(this, arguments);
  } else {
    describe.apply(this, arguments);
  }
};

global.itHeavy = function () {
  if (process.env.WIX_NODE_BUILD_WATCH_MODE) {
    it.skip.apply(this, arguments);
  } else {
    it.apply(this, arguments);
  }
};
