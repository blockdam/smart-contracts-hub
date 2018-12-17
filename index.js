const app = require('./express'),
    appConfig = require('./config/index'),
    TokenController = require('./controllers/token.controller'),
    WebSocket = require('ws'),
    logger = require('./services/logger.service'),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let tokenCtrl = new TokenController();

    // let token = new cronJob('1 * * * * *', function(){
    //     tokenCtrl.recordEvents();
    // }, null, false);

    tokenCtrl.init().then( () => {
         tokenCtrl.recordEvents();
       // tokenCtrl.getPastEvents();
    })
    .catch(error => {
        logger.error(error);
    });


});
