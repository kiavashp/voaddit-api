var config = require('config');
var queries = require('./queries');
var db = require('models');

function listUsers(callback) {

    var query = queries.listUsers();

    db.query(query, callback);

}

function getUser(iduser, callback) {

    var query = queries.getUser(iduser);

    db.query(query, callback);

}

function updateUser(params, callback) {

    var query = queries.updateUser(params);

    db.query(query, function(err, result) {

        if (err) {
            return callback(err);
        }

        callback(null, result.affectedRows);

    });

}

exports.listUsers = listUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
