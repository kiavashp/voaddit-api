var config = require('config');
var queries = require('./queries');
var db = require('models');

function listPosts(callback) {

    var query = queries.listPosts();

    db.query(query, callback);

}

function getPost(idpost, callback) {

    var query = queries.getPost(idpost);

    db.query(query, callback);

}

function updatePost(params, callback) {

    var query = queries.updatePost(params);

    db.query(query, function(err, result) {

        if (err) {
            return callback(err);
        }

        callback(null, result.affectedRows);

    });

}

exports.listPosts = listPosts;
exports.getPost = getPost;
exports.updatePost = updatePost;
