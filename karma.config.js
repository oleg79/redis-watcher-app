const webpackConfig = require('./webpack.config');

const configuration = {
  // Paths
  basePath: '',
  exclude: [],
  files: [
    { pattern: 'src/**/*.test.ts', watch: false },
  ],

  // Module processing
  preprocessors: {
    // Process all *test* modules with webpack
    // (it will handle dependencies)
    'src/**/*.test.ts': ['webpack', 'sourcemap'],
  },

  // Webpack config
  webpack: webpackConfig,
  webpackMiddleware: {
    stats: 'errors-only',
  },

  browsers: ['PhantomJS'],

  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },

  // Reporters
  reporters: ['dots'],
  logLevel: config.LOG_INFO,
  colors: true,

  // Test framework configuration
  frameworks: ['jasmine'],

  // Runner configuration
  port: 9876,
  autoWatch: true,
  singleRun: true,
  concurrency: Infinity
};

if (process.env.TRAVIS) {
  .browsers = ['Chrome_travis_ci'];
}

module.exports = (config) => {
  config.set(configuration);
};
