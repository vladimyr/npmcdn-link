'use strict';

const path = require('path');

/** @type {import('bili').Config} */
const config = {
  input: {
    'script': 'src/index.js',
    'contentscript': 'src/injector.js'
  },
  output: {
    dir: path.join(__dirname, './extension'),
    format: 'esm',
    fileName: '[name][min].js'
  },
  bundleNodeModules: true,
  plugins: {
    'node-resolve': {
      browser: true
    },
    cpy: {
      files: path.join(__dirname, './src/manifest.json'),
      dest: path.join(__dirname, './extension')
    }
  }
};

module.exports = config;
