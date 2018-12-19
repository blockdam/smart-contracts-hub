'use strict';

let express = require('express'),
    membersCtrl = require('../controllers/members.controller');

const router = express.Router();


const ctrl = membersCtrl(); // create instance of instagram controller

// CRUD routes

router.route('')
    .get(ctrl.getAll)

router.route('/:id')
    .get(ctrl.findOne)
// .post(ctrl.getFeed)
// .put(update)
// .delete(del);

module.exports = router;
