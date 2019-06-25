'use strict';

const manifest = require('./src/manifest.json');
const targets = { chrome: manifest.minimum_chrome_version };

module.exports = {
  presets: [['@babel/preset-env', { targets }]]
};
