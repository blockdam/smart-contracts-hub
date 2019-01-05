'use strict';

let express = require('express'),
    readingListController = require('../controllers/readingList.controller');

const router = express.Router();
const ctrl = new readingListController();
let metaData = ctrl.getMetaData.bind(ctrl);
let store = ctrl.store.bind(ctrl);

// CRUD routes
router.route('/')
    .get(metaData)
    .post(store);

module.exports = router;
