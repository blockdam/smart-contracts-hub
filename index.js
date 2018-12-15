let app = require('./express'),
    appConfig = require('./config/index'),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    // debug(`server started on port ${appConfig.port} (${appConfig.env})`);
    console.log('server started on port ' + appConfig.port + ' (' + appConfig.env + ')');

    let token = new cronJob('1 * * * * *', function(){

        let tokenCtrl = require('./controllers/token.controller');
        tokenCtrl.recordState();
        console.log('checked with token');

    }, null, false);

    token.start();

});
