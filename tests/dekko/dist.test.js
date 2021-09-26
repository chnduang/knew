const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('knew-with-locales.js')
  .hasFile('knew-with-locales.min.js')
  .hasFile('knew.css')
  .hasFile('knew.min.css')
  .hasFile('knew.js')
  .hasFile('knew.min.js')
  .hasFile('knew.less')
  .hasFile('knew.dark.less')
  .hasFile('knew.dark.css')
  .hasFile('knew.compact.less')
  .hasFile('knew.compact.css')
  .hasFile('dark-theme.js');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `dist` directory is valid.'));
