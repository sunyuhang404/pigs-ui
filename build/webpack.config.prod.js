
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(baseConfig, {
  mode: 'production',
  // devtool: 'inline-source-map',
  entry: {
    index: path.resolve(__dirname, '../src/dev.js')
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: '[name]_[chunkhash:8].js',
  },
  plugins: [
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
}))
