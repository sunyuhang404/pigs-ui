const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const utils = require('./utils');


module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/dev.js')
  },
  output: {
    path: resolveApp('./docs'),
    filename: 'index.js',
    // publicPath: '/',
    // library: 'pigs',
    // libraryExport: 'default',
    // libraryTarget: 'umd',
    // umdNamedDefine: true,
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.less'],
    alias: {
      react: 'nervjs',
      'react-dom': 'nervjs',
      'create-react-class': 'nerv-create-class',
      '@': utils.resolve('src'),
    },
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
        use: [
          'babel-loader', {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20480, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'assets/img/', // 图片打包后存放的目录
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20480, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'assets/font/', // 图片打包后存放的目录
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
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
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }),
    new optimizeCss({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
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
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: false,
          ie8: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
