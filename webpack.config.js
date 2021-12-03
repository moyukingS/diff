const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'dist.js',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
    }),
  ],
};
