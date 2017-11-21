module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8
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
    "no-new": 0,
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    "no-confusing-arrow": 0,
    "comma-dangle": 0
  }
};
