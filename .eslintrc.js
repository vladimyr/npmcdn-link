module.exports = {
  extends: 'semistandard',
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  },
  env: { browser: true }
};
