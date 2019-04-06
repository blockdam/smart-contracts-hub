'use strict';

let express = require('express'),
    ColonyCtrl = require('../controllers/colony.controller'),
    HtmlCtrl = require('../controllers/html.controller');

const router = express.Router();

const colonyCtrl = new ColonyCtrl();
const htmlCtrl = new HtmlCtrl();

const handlePermissionsCall = colonyCtrl.handlePermissionsCall.bind(colonyCtrl);
const handleMintCall = colonyCtrl.handleMintCall.bind(colonyCtrl);
const handleBurnCall = colonyCtrl.handleBurnCall.bind(colonyCtrl);
const handleTransferCall = colonyCtrl.handleTransferCall.bind(colonyCtrl);
const handleTestCall = colonyCtrl.handleTestCall.bind(colonyCtrl);
const handleGeneralInfoCall = colonyCtrl.handleGeneralInfoCall.bind(colonyCtrl);

const createTaskCall = colonyCtrl.createTaskCall.bind(colonyCtrl);
const modifyTaskCall = colonyCtrl.modifyTaskCall.bind(colonyCtrl);
const getTasks = colonyCtrl.getTasks.bind(colonyCtrl);

const createDomainCall = colonyCtrl.createDomainCall.bind(colonyCtrl);
const modifyDomainCall = colonyCtrl.modifyDomainCall.bind(colonyCtrl);
const getDomains = colonyCtrl.getDomains.bind(colonyCtrl);

const handleHTMLSnippetCall = htmlCtrl.handleHTMLSnippetCall.bind(htmlCtrl);


router.route('/test')
    .get(handleTestCall);

router.route('/info')
    .get(handleGeneralInfoCall);

router.route('/task/')
    .post(createTaskCall);

router.route('/task')
    .put(modifyTaskCall);

router.route('/task')
    .get(getTasks);

router.route('/domain')
    .post(createDomainCall);

router.route('/domain')
    .put(modifyDomainCall);

router.route('/domain')
    .get(getDomains);

router.route('/permissions')
    .post(handlePermissionsCall);

router.route('/economy/mint')
    .post(handleMintCall);

router.route('/economy/burn')
    .post(handleBurnCall);

router.route('/economy/transfer')
    .post(handleTransferCall);

router.route('/html/:snippet/:id')
    .post(handleHTMLSnippetCall);

module.exports = router;