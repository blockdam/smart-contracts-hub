'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

class Web3Service {
    constructor() {

        this.web3 = null;
    }

    get() {

        const self = this;

        return new Promise((resolve, reject) => {

            if (self.web3 === null) {

                eth.get('rinkeby').then((web3) => {

                    self.web3 = web3;
                    resolve(self.web3);
                });


            } else {
                resolve(self.web3);
            }
        });
    }

    set(web3) {

        this.web3 = web3;
    }
}

module.exports = Web3Service;