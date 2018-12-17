const app = require('./express'),
    appConfig = require('./config/index'),
    TokenController = require('./controllers/token.controller'),
    WebSocket = require('ws'),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let tokenCtrl = new TokenController();

    let token = new cronJob('1 * * * * *', function(){
        tokenCtrl.recordState();
    }, null, false);



    tokenCtrl.init().then( () => {
       // token.start();
        tokenCtrl.recordState();
    })
    .catch(error => {
        logger.error(error);
    });


});
