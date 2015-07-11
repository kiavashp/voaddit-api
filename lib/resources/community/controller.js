var log = require('logger')(module.filename);
var Boom = require('boom');
var model = require('./model');

function listCommunities(request, reply) {

    model.listCommunities(function(err, communities) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        reply(communities)
            .type('application/json')
            .spaces(2);

    });

}

function getCommunity(request, reply) {

    model.getCommunity(request.params.idcommunity, function(err, community) {

        if (err) {
            log.error({err: err});
            return reply(Boom.badImplementation(err.message));
        }

        if (community.length !== 1) {
            return reply(Boom.notFound());
        } else {
            community = community[0];
        }

        reply(community)
            .type('application/json')
            .spaces(2);

    });

}

function updateCommunity(request, reply) {

    if (!('idcommunity' in request.params)) {
        return reply(Boom.badRequest('idcommunity not specified'));
    }

    model.updateCommunity(request.params, function(err, affectedRows) {

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

exports.listCommunities = listCommunities;
exports.getCommunity = getCommunity;
exports.updateCommunity = updateCommunity;
