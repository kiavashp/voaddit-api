var config = require('config');
var controller = require('./controller')
var Joi = require('joi');
var communityPath = config.server.path.community;

var routes = [
    {
        method: 'GET',
        path: communityPath,
        handler: controller.listCommunities
    },
    {
        method: 'GET',
        path: communityPath + '/{idcommunity}',
        handler: controller.getCommunity,
        config: {
            validate: {
                params: {
                    idcommunity: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: communityPath + '/{idcommunity}',
        handler: controller.updateCommunity,
        config: {
            validate: {
                params: {
                    idcommunity: Joi.number().integer()
                }
            }
        }
    }
];

module.exports = routes;
