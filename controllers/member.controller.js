'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const MemberPersistence = require('../persistences/member.persistence');
const config = require('../config');
const fs = require('graceful-fs');

class MemberController {


    constructor () {
        
        this.memberPersistence = new MemberPersistence();
    }


    getAll(req, res) {

        let self = this;


    }

    findOne(req, res) {

        let self = this;

        this.memberPersistence.findOne(req.params.id)
            .then( (result) => {
                res.status(200).send(JSON.stringify(result));
            })
            .catch( (err) => {
                logger.info(err);
                res.status(200).send({});
            });
    }



}

module.exports = MemberController;


