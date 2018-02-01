let webpackConfig = require('./webpack.config.babel.js');

module.exports = function(config){
    'use strict';
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai', 'sinon'],

        files: [
            'test/**/*.test.js',
            'src/**/*.js',
        ],
        exclude : [
            'src/index.js'
        ],

        preprocessors: {
            'test/**/*.test.js': ['webpack'],
            'src/**/*.js' : ['webpack','coverage']
        },
        webpack : webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            // specify a common output directory
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                // { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                // { type: 'text', subdir: '.', file: 'text.txt' },
                // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

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