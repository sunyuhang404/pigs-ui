const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('http-proxy-middleware');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const utils = require('./utils');

const babelLoader = require.resolve('babel-loader');
const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    onlyCompileBundledFiles: true,
  },
};

module.exports = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
  },
  entry: {
    index: resolveApp('./src/dev.js')
  },
  output: {
    path: resolveApp('./dist'),
    filename: 'js/[name].js',
    // publicPath: '/',
    // library: 'pigs',
    // libraryExport: 'default',
    // libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss'],
    alias: {
      react: 'nervjs',
      'react-dom': 'nervjs',
      'create-react-class': 'nerv-create-class',
      '@': utils.resolve('src'),
    },
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [babelLoader, tsLoader],
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          { loader: require.resolve('less-loader') },
        ],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: utils.resolve('index.html'),
      // favicon: resolveApp('./src/assets/favicon.png'),
    }),
  ],
};
