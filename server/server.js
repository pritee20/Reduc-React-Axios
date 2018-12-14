/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


"use strict";
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compression = require('compression');


const express = require('express');
const server = new express();

let port = process.env.PORT || 5000;

let isDeveloping = process.env.NODE_ENV !== 'production';

var config = isDeveloping ? require('../config/webpack.config.dev') : require('../config/webpack.config.prod');

const compiler = webpack(config, compilerCallback);

function compilerCallback(error, data) {

    if (error) {
        console.log("Webpack couldn't compile. Exiting server." + error);
        process.exit(0);
    }

    const middleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        hot: true,
        contentBase: '../build',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    server.use(middleware);
    server.use(webpackHotMiddleware(compiler));

    if (isDeveloping) {
        console.log(`DEV Server is listening to port: ${port}`);
    } else {
        console.log(`PROD Server is listening to port: ${port}`);
    }

    server.use(compression({filter: shouldCompress}));
    server.use(express.static(path.join(__dirname, '../build')));
    
    server.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../build/index.html'))
    });

    server.listen(port);

    function shouldCompress(req, res) {
        console.log(req.originalUrl);
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        }

        // callback to standard filter function
        return compression.filter(req, res)
    }

}