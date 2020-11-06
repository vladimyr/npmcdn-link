'use strict';

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const copy = require('rollup-plugin-cpy');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;

const plugins = [
  resolve({ browser: true }),
  commonjs(),
  babel({ babelHelpers: 'bundled' })
];

/** @type {Array<import('rollup').RollupOptions>} */
const config = [{
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: path.join(__dirname, './extension/script.js')
  },
  plugins
}, {
  input: './src/injector.js',
  output: {
    format: 'esm',
    file: path.join(__dirname, './extension/contentscript.js')
  },
  plugins: plugins.concat(copy({
    files: path.join(__dirname, './src/manifest.json'),
    dest: path.join(__dirname, './extension')
  }))
}];

module.exports = config;
