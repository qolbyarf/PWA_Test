const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

async function getImageminMozjpeg() {
  const ImageminMozjpeg = await import('imagemin-mozjpeg');
  return ImageminMozjpeg.default;
}

module.exports = async () => {
  const ImageminMozjpeg = await getImageminMozjpeg();
  return {
    entry: {
      app: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/templates/index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/public/'),
            to: path.resolve(__dirname, 'dist/'),
          },
        ],
      }),
      new ImageminWebpackPlugin({
        plugins: [
          ImageminMozjpeg({
            quality: 50,
            progressive: true,
          }),
        ],
        overrideExtension: true,
      }),
    ],
  };
};
