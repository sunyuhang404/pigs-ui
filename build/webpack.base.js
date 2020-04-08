
const path = require('path');
const glob = require('glob');
const HappyPack = require('happypack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const config = {
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.less'],
    alias: {
      react: 'nervjs',
      React: 'Nerv',
      'react-dom': 'nervjs',
      'create-react-class': 'nerv-create-class',
      '@': path.resolve(__dirname, '../src'),
    },
    mainFields: ['main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'happypack/loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于1k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'theme/image/', // 图片打包后存放的目录
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
              limit: 1024, // 小于1k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'theme/font/', // 图片打包后存放的目录
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  // 指定需要兼容的浏览器的版本 兼容浏览器最近的2个版本，使用人数超过1%和指定的浏览器版本
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
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
    new optimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HappyPack({
      // 开启babel-loader的缓存
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    // new PurgecssPlugin({
    //   // paths 是绝对路径 多页面的时候 paths传一个数组
    //   paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
    // }),
    new HardSourceWebpackPlugin()
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
      new TerserPlugin({
        parallel: 4,
        cache: true,
      })
    ],
  },
};

module.exports = config;
