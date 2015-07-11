var mysql = require('mysql');
var config = require('../../lib/node_modules/config');
var log = require('../../lib/node_modules/logger')(module.filename);
var path = require('path');
var fs = require('fs');

var db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: true
});

var method = process.argv[2];
var methods = {};

function runSqlFile(fileName, callback) {

    var filePath = path.resolve(__dirname + '/sql', fileName);
    var sql;
    var err;

    if (!fs.existsSync(filePath)) {
        err = Error('sql file not found: ' + filePath);
        return callback(err);
    }

    if (!fs.lstatSync(filePath).isFile()) {
        err = Error(filePath + 'is not a file ');
        return callback(err);
    }

    try {
        sql = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        err = Error('error reading ' + filePath + ': ' + error.message);
        return callback(err);
    }

    if (!sql.trim()) {
        err = Error('empty file: ' + filePath);
        return callback(err);
    }

    sql = 'USE `' + config.db.name + '`;\n' + sql;

    db.query(sql, callback);

}

methods.schema = function dbSchema() {

    var dropCreateDb = 'DROP DATABASE IF EXISTS `' + config.db.name + '`;\n' +
        'CREATE DATABASE `' + config.db.name + '` DEFAULT CHARACTER SET UTF8;';

    db.query(dropCreateDb, function dropAndCreateDbCb(err) {

        if (err) {
            log.fatal({err: err});
            process.exit(1);
        }

        runSqlFile('schema.sql', function runSchema(err) {

            if (err) {
                log.fatal({err: err});
                process.exit(1);
            }

            process.exit(0);

        });

    });

};

methods.truncate = function dbTruncate() {

    var truncateTables = 'USE `' + config.db.name + '`;\n';
    var t;

    truncateTables += 'SET FOREIGN_KEY_CHECKS=0;\n';

    for (t in config.db.tables) {
        query += 'TRUNCATE ' + config.db.tables[t] + ';\n';
    }

    truncateTables += 'SET FOREIGN_KEY_CHECKS=1;\n';

    db.query(truncateTables, function truncateTablesCb(err) {

        if (err) {
            log.fatal({err: err});
            process.exit(1);
        }

        process.exit(0);

    });

};

methods.test = function dbTest() {

    runSqlFile('test.sql', function runTest(err) {

        if (err) {
            log.fatal({err: err});
            process.exit(1);
        }

        process.exit(0);

    });

};

methods.dev = function dbDev() {

    runSqlFile('dev.sql', function runDev(err) {

        if (err) {
            log.fatal({err: err});
            process.exit(1);
        }

        process.exit(0);

    });

};

if (methods.hasOwnProperty(method)) {
    log.trace('scripts/db - ' + method + '()');
    methods[method]();
} else {
    log.warn('scripts/db - invalid method specified: ' + method);
    process.exit(1);
}
