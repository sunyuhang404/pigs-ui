

const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const commander = require('commander');
const webpackConfig = require('./webpack.config.test');

const spinner = ora('building for production...').start();
commander
  .version('0.0.2')
  .option('-t, --type <string>', 'Set Build Type, like nw win or xp.')
  .parse(process.argv);
const type = process.argv[2] || 'nw';

webpack(webpackConfig, async (err, stats) => {
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
