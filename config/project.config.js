/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

const path = require('path');

/*
 API configuration
 */
const HOST_PROD = "https://operator.api.getmyparking.com";
const HOST_DEV = "http://dev.api.getmyparking.com:5000";
const LOCAL_HOST = "http://127.0.0.1";
const PORT = "5000";
const BASE_URL = "/api/v1/";


// TODO - Have to set the API_end Based on NODE_ENV ##### Nishant
// const API_end = process.env.NODE_ENV == "production" ? HOST_PROD + BASE_URL : HOST_DEV+":"+PORT+BASE_URL;
// const API_end = LOCAL_HOST+":"+PORT+BASE_URL;
// const API_end = HOST_DEV + BASE_URL;
const API_end = HOST_PROD + BASE_URL;


const config = {
    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Folder Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'src',
    dir_build: 'build',
    dir_test: 'tests',

    compiler_vendors: [
        'react',
        'react-redux',
        'react-router',
        'redux'
    ],

    // ----------------------------------
    // Test Configuration
    // ----------------------------------
    coverage_reporters: [{
        type: 'text-summary'
    }, {
        type: 'lcov',
        dir: 'coverage'
    }],
    HOST: HOST_DEV,
    PORT: PORT,
    BASE_URL: BASE_URL,
    API_end: API_end
};

/************************************************
 All Internal Configuration Below
 ************************************************/

// ------------------------------------
// Global Environment Variable
// ------------------------------------
config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__DEV__': config.env === 'development',
    '__PROD__': config.env === 'production',
    '__TEST__': config.env === 'test'
};

module.exports = config;
