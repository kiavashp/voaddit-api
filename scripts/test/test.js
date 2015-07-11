var npm = require('npm');
var log = require('../../lib/node_modules/logger')(module.filename);
var testFilePath = __dirname + '/files/' + (process.argv[2] || '');

npm.load(function(err) {

    if (err) {
        log.error({err: err});
        process.exit(1);
    }

    npm.commands.run(['mocha', testFilePath], function(err) {

        if (err) {
            log.error({err: err});
            process.exit(1);
        }

        process.exit(0);

    });

});
