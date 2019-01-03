'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const config = require('../config');
const Web3 = require('web3');

// set database connection object
let web3 = null;
// get connection to mongodb
function get(network) {

    let self = this;

    return new Promise((resolve, reject) => {

        if (network === 'rinkeby') {
            web3 = new Web3(
                new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws') // 'https://rinkeby.infura.io/
            );
            resolve(web3);

        } else if (network === 'localhost') {
            web3 = new Web3(
                new Web3.providers.HttpProvider('http://localhost:7545')
            );
            resolve(web3);
        }
    });
}

module.exports = {
    get : get
};





