var log = require('logger')(module.filename);
var Boom = require('boom');
var model = require('./model');

function listUsers(request, reply) {

    model.listUsers(function(err, users) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        reply(users)
            .type('application/json')
            .spaces(2);

    });

}

function getUser(request, reply) {

    model.getUser(request.params.iduser, function(err, user) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        if (user.length !== 1) {
            return reply(Boom.notFound());
        } else {
            user = user[0];
        }

        reply(user)
            .type('application/json')
            .spaces(2);

    });

}

function updateUser(request, reply) {

    if (!('iduser' in request.params)) {
        return reply(Boom.badRequest('iduser not specified'));
    }

    model.updateUser(request.params, function(err, affectedRows) {

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

exports.listUsers = listUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
