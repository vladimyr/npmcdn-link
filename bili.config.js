module.exports = {
  input: 'src/index.js',
  outDir: 'extension',
  format: 'iife-min',
  filename: 'content-script.js',
  alias: {
    assert: require.resolve('nanoassert')
  },
  uglify: {
    output: { ascii_only: true }
  }
};
