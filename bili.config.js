'use strict';

/** @type {import('bili').Config} */
module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'extension',
    format: 'iife',
    fileName: 'content-script[min].js'
  },
  plugins: {
    'node-resolve': {
      browser: true
    }
  }
};
