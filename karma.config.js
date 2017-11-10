const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
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
      'src/**/*.test.ts': ['webpack', 'sourcemap']
    },

    // Webpack config
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },

    // TODO: resolve browser travis issues
    // browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['PhantomJS'],
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
  });
};
