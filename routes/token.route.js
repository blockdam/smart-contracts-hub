'use strict';

let express = require('express'),
    tokenCtrl = require('../controllers/token.controller');

const router = express.Router();


const tokenCtrl = new tokenCtrl(); // create instance of instagram controller
 // save instance of blog controller
let get = tokenCtrl.handleGetCall.bind(tokenCtrl);
// bind blog controller context to this in save function
//     update = pageCtrl.handleUpdateCall.bind(pageCtrl), // bind blog controller context to this in update function
//     del = pageCtrl.handleDeleteCall.bind(pageCtrl), // bind blog controller context to this in update function
//     preview = pageCtrl.handlePreviewCall.bind(pageCtrl);

// CRUD routes
router.route('/')
    .get(get)
 //   .get(ctrl.getState)
// .put(update)
// .delete(del);

module.exports = router;
