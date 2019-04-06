'use strict';

const colonyConnector = require('../connectors/colony.connector');
const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

class ColonyService {

    constructor() {}

    async get(network,colonyID,privateKey) {

        console.log(network);
        console.log(privateKey);

        try {
            let networkClient = await colonyConnector.create(network,privateKey);
            let colonyClient = await networkClient.getColonyClient(colonyID);
            let tokenClient = colonyClient.tokenClient;
            let tokenObject = await colonyClient.getToken.call();
            let token = tokenObject.address;

            return {
                networkClient : networkClient,
                colonyClient : colonyClient,
                tokenClient : tokenClient,
                tokenObject : tokenObject,
                token : token
            }

        } catch (error) {
            console.log(error);
        }


    }

}

module.exports = ColonyService;