/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


var webpack = require('webpack');
const path = require('path');
const project = require('./project.config');

module.exports = function(config) {
    config.set({
        basePath: '../',
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha', 'sinon'],
        files: [{
            pattern: `${project.dir_test}/test-bundler.js`,
            watched: false,
            served: true,
            included: true
        },
          "bower_components/modernizr/modernizr.custom.js",
          "bower_components/jquery/dist/jquery.js",
          "bower_components/bootstrap/dist/js/bootstrap.js",
          "bower_components/jQuery-Storage-API/jquery.storageapi.js",
          "bower_components/jquery.easing/js/jquery.easing.js",
          "bower_components/animo.js/animo.js",
          "bower_components/moment/min/moment.min.js",
          "bower_components/jquery-localize-i18n/dist/jquery.localize.js",
          "bower_components/datatables-export/js/datatables.min.js",
          "bower_components/html.sortable/dist/html.sortable.js",
          "bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
          "bower_components/sweetalert/dist/sweetalert.min.js",
          "bower_components/select2/dist/js/select2.js"
        ],
        preprocessors: {
            [`${project.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'cheap-module-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                    // Force all modules to use the same jquery version.
                    'jquery': path.join(__dirname, '../node_modules/jquery/src/jquery')
                }
            },
            module: {
                noParse: [
                    /\/sinon\.js/
                ],
                loaders: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'es2016', 'stage-2']
                    }
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }, {
                    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                    loader: 'url?prefix=font/&limit=10000'
                }, {
                    test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
                    loader: 'imports?define=>false,require=>false'
                }]
            },
            externals: {
                'sinon': 'sinon',
                'cheerio': 'window',
                'react/addons': 'react',
                'react/lib/ExecutionEnvironment': 'react',
                'react/lib/ReactContext': 'react'
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};