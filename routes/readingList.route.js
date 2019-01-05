'use strict';

let express = require('express'),
    readingListController = require('../controllers/readingList.controller');

const router = express.Router();
const ctrl = new readingListController();
let metaData = ctrl.getMetaData.bind(ctrl);

// CRUD routes
router.route('/')
    .post(metaData)
// .put(update)
// .delete(del);

module.exports = router;
