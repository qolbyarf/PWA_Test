const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (async () => {
  const common = await import('./webpack.common.js');
  const commonConfig = await common.default();
  return merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      open: true,
      port: 9000,
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
      },
      compress: true,
    },
  });
})();