

const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const commander = require('commander');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigPub = require('./webpack.config.component');
const webpackConfigProd = require('./webpack.config.prod');

const spinner = ora('building for production...').start();
commander
  .version('0.0.2')
  .option('-t, --type <string>', 'Set Build Type, like nw win or xp.')
  .parse(process.argv);

const type = process.argv[2];
const report = process.argv[3];

if (report) {
  if (type === 'pub') {
    webpackConfigPub.plugins.push(new BundleAnalyzer());
  } else {
    webpackConfigProd.plugins.push(new BundleAnalyzer());
  }
}


webpack(type === 'pub' ? webpackConfigPub : webpackConfigProd, async (err, stats) => {
  if (err) throw err;
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false,
  })}\n\n`);

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  spinner.text = 'build execution file...';

  spinner.stop();
});
