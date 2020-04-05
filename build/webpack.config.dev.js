
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    // contentBase: './dist',
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: false,
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      hash: true,
      template: path.resolve(__dirname, '../index.html'),
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
    })
  ]
});
