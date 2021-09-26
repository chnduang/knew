#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
const genCss = require('antd-pro-merge-less');
const defaultVar = require('./default-vars');
const dark = require('./dark-vars');
const compact = require('./compact-vars');

genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './_site/dark.css',
      modifyVars: {
        ...defaultVar,
        ...dark,
        '@site-text-color': '@heading-color',
        '@site-markdown-code-bg': '@input-bg',
      },
    },
    {
      theme: 'compact',
      fileName: './_site/compact.css',
      modifyVars: {
        ...defaultVar,
        ...compact,
      },
    },
  ],
  {
    // 忽略 antd 的依赖,用于打包 antd 自己的依赖
    ignoreAntd: false,
    // css module
    isModule: false,
    // 不使用缓存
    cache: false,
    loadAny: true,
    // 忽略 pro-layout 的依赖
    ignoreProLayout: true,
  },
);

const options = {
  antDir: path.join(__dirname, '../node_modules/antd'),
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antdStylesDir: path.join(__dirname, '../node_modules/antd/lib/'),
  varFile: path.join(__dirname, '../site/theme/static/theme.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../_site/color.less'),
};

generateTheme(options);
