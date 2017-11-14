module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },

  env: {
    browser: true,
  },
  plugins: [
    "html",
    "flowtype-errors",
    "import",
    "node",
    "promise",
    "standard",
    "jsx-a11y"
  ],
  extends: ["airbnb-standard", "vue"],
  rules: {
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
    "indent-size": [true, 2],
    "no-tabs": 1,
    "no-new": 0
  }
};
