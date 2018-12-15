'use strict';

let express = require('express'),
    daoRoutes = require('./dao.route'),
    tokenRoutes = require('./token.route');

const router = express.Router();

router.use('/dao', daoRoutes);
router.use('/token', tokenRoutes);

module.exports = router;