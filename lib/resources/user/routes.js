var config = require('config');
var controller = require('./controller')
var Joi = require('joi');
var userPath = config.server.path.user;

var routes = [
    {
        method: 'GET',
        path: userPath,
        handler: controller.listUsers
    },
    {
        method: 'GET',
        path: userPath + '/{iduser}',
        handler: controller.getUser,
        config: {
            validate: {
                params: {
                    iduser: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: userPath + '/{iduser}',
        handler: controller.updateUser,
        config: {
            validate: {
                params: {
                    iduser: Joi.number().integer()
                }
            }
        }
    }
];

module.exports = routes;
