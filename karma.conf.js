// Karma configuration
// Generated on Wed Feb 24 2016 14:59:26 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    urlRoot: '/',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'src/*.js',
        'test/*-spec.js',
        'test/polyfills/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // karma.conf.js 
    systemjs: {
        // Path to your SystemJS configuration file 
        //configFile: 'test/system.conf.js',
        configFile: 'config.js',
        serveFiles: [
            'src/*.js',
            'jspm_packages/github/DEGJS/**/*.js'
        ],
        config: {
            defaultJSExtensions: true,
            paths: {
                'babel': 'node_modules/babel-core/browser.js',
                'systemjs': 'node_modules/systemjs/dist/system.js',
                'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
            }
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
