'use strict';

const Promise = require('bluebird');


const logger = require('../services/logger.service');
const config = require('../config');

// set database connection object
let web3 = null;

// get connection to mongodb
function getEthereumConnection(network) {

    if (network === 'rinkeby') {
        web3 = new Web3(
                new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
        );
    }
    return web3;
}

module.exports = {
    getConnection: function(network) {
        return getEthereumConnection(network).then((conn) => {
            return conn.collection('token_events');
        })
    }
};





