module.exports = {
  env: {
    mocha: true
  },
  globals: {
    expect: true,
    sinon: true
  },
  plugins: ['chai-friendly'],
  rules: {
    // allow chai expressions
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2
  }
}
