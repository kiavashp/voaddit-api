var Hapi = require('hapi');
var config = require('config');
var routes = require('routes');
var log = require('logger')(module.filename);

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: true,
            stripTrailingSlash: true
        }
    }
});

server.connection({
    port: config.server.port
});

routes.register(server);

server.ext('onRequest', function serverOnRequest(request, reply) {

    log.trace({req: request.raw.req});

    reply.continue();

});

server.start(function serverStart(error) {

    if (error) {
        log.fatal({err: error});
        throw error;
    }

    log.info('server listening at localhost :' + config.server.port);

});

module.exports = server;
