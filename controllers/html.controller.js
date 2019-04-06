'use strict';

const eth = require('../connectors/ethereum.connector');

const logger = require('../services/logger.service');

const ColonyService = require('../services/colony.service');
const HashService = require('../services/hash.service');
const TaskService = require('../services/task.service');
const DomainService = require('../services/domain.service');

const TemplateService = require('../services/template.service');

const config = require('../config');
const fs = require('graceful-fs');

class HTMLController {

    constructor() {

        this.colonyService = new ColonyService();
        this.taskService = new TaskService();
        this.domainService = new DomainService();
        this.templateService = new TemplateService();
    }

    async handleHTMLSnippetCall(req,res) {

        let self = this,
            body;

        const  { networkClient, colonyClient, tokenClient, tokenObject, token  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,req.body.key);

        if(req.params.id !== 0) {

            body = {

                key: req.body.key,
                task: await this.taskService.get(colonyClient, parseInt(req.params.id), token)
            }
        } else {
            body = {};
        }

        let htmlSnippet = await self.templateService.render(req.params.snippet + '.handlebars', body); // render template

        res.send(htmlSnippet);
        res.status(200);
    }


}

module.exports = HTMLController;