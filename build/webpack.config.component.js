const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');


const getEntry = () => {
  const entry = {};
  const entryFiles = glob.sync(path.join(__dirname, '../src/packages/*/index.js'));
  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/packages\/(.*)\/index\.js/);
    const compName = match && match[1];
    entry[compName] = entryFile;
    return entry;
  });
  return entry;
}

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: 'inline-source-map',
  entry: Object.assign(getEntry(), {
    index: path.resolve(__dirname, '../src/index.js')
  }),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
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
      // {
      //   from: path.resolve(__dirname, '../src/packages'),
      //   to: '../packages',
      // },
    ]),
  ]
});