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

    async getMetaData (targetUrl) {

        let self = this;
        const { body: html, url } = await got(targetUrl)
        const metadata = await metascraper({ html, url })
        return metadata;
    }
}

module.exports = URLMetaDataService;
