
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');


module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  },
  entry: {
    index: path.resolve(__dirname, '../src/dev.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})