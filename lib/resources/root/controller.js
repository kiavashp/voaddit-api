var config = require('config');

function getRoot(request, reply) {

    reply(config.server.path)
        .type('application/json')
        .spaces(2);

}

exports.getRoot = getRoot;
