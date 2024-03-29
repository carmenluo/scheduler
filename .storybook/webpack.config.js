const path = require("path");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    watch: true,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    }
  };
};
