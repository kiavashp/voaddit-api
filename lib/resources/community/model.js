var config = require('config');
var queries = require('./queries');
var db = require('models');

function listCommunities(callback) {

    var query = queries.listCommunities();

    db.query(query, callback);

}

function getCommunity(idcommunity, callback) {

    var query = queries.getCommunity(idcommunity);

    db.query(query, callback);

}

function updateCommunity(params, callback) {

    var query = queries.updateCommunity(params);

    db.query(query, function(err, result) {

        if (err) {
            return callback(err);
        }

        callback(null, result.affectedRows);

    });

}

exports.listCommunities = listCommunities;
exports.getCommunity = getCommunity;
exports.updateCommunity = updateCommunity;
