'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const config = require('../config');
const Web3 = require('web3');

// set database connection object
let web3 = null;

// get connection to mongodb
function get(network) {

    console.log('ddd');

    if (network === 'rinkeby') {
        web3 = new Web3(
                new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
        );
    }
    return web3;
}

module.exports = {
    get : get
};





