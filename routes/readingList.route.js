'use strict';

let express = require('express'),
    readingListController = require('../controllers/readingList.controller');

const router = express.Router();
const ctrl = new readingListController();
let list = ctrl.getList.bind(ctrl);
let metaData = ctrl.getMetaData.bind(ctrl);
let store = ctrl.store.bind(ctrl);

// CRUD routes
router.route('/')
    .get(list)
    .post(metaData)
    .put(store);

module.exports = router;
