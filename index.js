let app = require('./express'),
    appConfig = require('./config/index'),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let token = new cronJob('1 * * * * *', function(){

        let tokenCtrl = require('./controllers/token.controller');
        tokenCtrl.recordState();
        console.log('checked with token');

    }, null, false);

    token.start();

});
