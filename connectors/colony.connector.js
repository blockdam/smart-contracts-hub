'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const config = require('../config');


// Import the prerequisites
const { getNetworkClient } = require('@colony/colony-js-client');
const { open } = require('@colony/purser-software');


function create(network, privateKey) {

    let self = this;

    return new Promise((resolve, reject) => {

        // Create a wallet with the private key (so we have a balance we can use)
        open({ privateKey }).then( (wallet) => {
            // Check out the logs to see the address of the wallet
            logger.info('Wallet Address: ' + wallet.address);
            // Connect to ColonyNetwork with the adapter!
            return getNetworkClient(network, wallet).then( (networkClient) => {
                resolve(networkClient);
            });
        });
    });
}

module.exports = {
    create : create
};





