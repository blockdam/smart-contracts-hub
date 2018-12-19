'use strict';

let express = require('express'),
    daoRoutes = require('./dao.route'),
    tokenRoutes = require('./token.route'),
    membersRoutes = require('./members.route');

const router = express.Router();

router.use('/dao', daoRoutes);
router.use('/token', tokenRoutes);
router.use('/members', membersRoutes);

module.exports = router;