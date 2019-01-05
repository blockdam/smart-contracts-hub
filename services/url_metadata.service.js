'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');
const moment = require('moment');
const got = require('got');

const metascraper = require('metascraper')([
    // require('metascraper-author')(),
    // require('metascraper-date')(),
    // require('metascraper-description')(),
    // require('metascraper-image')(),
    // require('metascraper-logo')(),
    // require('metascraper-clearbit-logo')(),
    // require('metascraper-publisher')(),
    // require('metascraper-title')(),
    // require('metascraper-url')()
])


class URLMetaDataService {

    constructor() {}

    getMetaData(url) {

        let self = this;

        return new Promise((resolve, reject) => {

            got(url)
            .then( (html) => {
                logger.info(html);
                return metascraper({ html, url })
            }).then( (result) => {
                logger.info(result);
                resolve(result);
            }).catch( (error) => {
                logger.info(error);
                reject(error);
            });
        });
    }
}

module.exports = URLMetaDataService;
