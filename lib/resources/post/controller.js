var log = require('logger')(module.filename);
var Boom = require('boom');
var model = require('./model');

function listPosts(request, reply) {

    model.listPosts(function(err, posts) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        reply(posts)
            .type('application/json')
            .spaces(2);

    });

}

function getPost(request, reply) {

    model.getPost(request.params.idpost, function(err, post) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        if (post.length !== 1) {
            return reply(Boom.notFound());
        } else {
            post = post[0];
        }

        reply(post)
            .type('application/json')
            .spaces(2);

    });

}

function updatePost(request, reply) {

    if (!('idpost' in request.params)) {
        return reply(Boom.badRequest('idpost not specified'));
    }

    model.updatePost(request.params, function(err, affectedRows) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        if (!affectedRows) {
            return reply(Boom.notFound());
        }

        reply()
            .code(204);

    });

}

exports.listPosts = listPosts;
exports.getPost = getPost;
exports.updatePost = updatePost;
