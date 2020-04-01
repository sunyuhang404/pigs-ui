const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist/lib'),
    filename: 'index.js',
    publicPath: '/',
    library: 'pigs-ui',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../package.json'),
        to: '../',
        ignore: ['.*'],
      },
      {
        from: path.resolve(__dirname, '../README.md'),
        to: '../',
      },
      {
        from: path.resolve(__dirname, '../src/packages'),
        to: '../packages',
      },
    ]),
  ]
});