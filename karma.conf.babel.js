let webpackConfig = require('./webpack.config.babel.js');

module.exports = function(config){
    'use strict';
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
           'test/*.test.js',
           'test/**/*.test.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/*.test.js': ['webpack'],
            'test/**/*.test.js': ['webpack']
        },
        webpack : webpackConfig,

        reporters: ['progress'],

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};