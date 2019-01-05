'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');
const moment = require('moment');
const got = require('got');

const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
])


class URLMetaDataService {

    constructor() {}

    getMetaData (url) {

        let self = this;


                const { body: html, url } = await got(url)
                const metadata = await metascraper({ html, url })



            // got(url)
            // .then( (html) => {
            //     return metascraper({ html, url })
            // }).then( (result) => {
            //     logger.info(result);
            //     resolve(result);
            // }).catch( (error) => {
            //     reject(error);
            // });
        });
    }
}

module.exports = URLMetaDataService;
