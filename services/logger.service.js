'use strict';

const logger = {

    info: function(msg, correlationId) {
        console.info(msg);
        if(correlationId) console.info(correlationId);
        console.info(new Date());
        console.info('------------------------------------------------------------------------------------');
    },

    warn: function(msg, correlationId) {
        console.warn(msg);
        if(correlationId) console.info(correlationId);
        console.info(new Date());
        console.info('------------------------------------------------------------------------------------');
    },

    error: function(error) {
        console.error(error.message);
        console.error(error);
        // console.error(error.stack);
        console.info(new Date());
        console.info('------------------------------------------------------------------------------------');
    },

};

module.exports = logger;