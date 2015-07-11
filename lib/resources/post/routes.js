var config = require('config');
var controller = require('./controller')
var Joi = require('joi');
var postPath = config.server.path.post;

var routes = [
    {
        method: 'GET',
        path: postPath,
        handler: controller.listPosts
    },
    {
        method: 'GET',
        path: postPath + '/{idpost}',
        handler: controller.getPost,
        config: {
            validate: {
                params: {
                    idpost: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: postPath + '/{idpost}',
        handler: controller.updatePost,
        config: {
            validate: {
                params: {
                    idpost: Joi.number().integer()
                }
            }
        }
    }
];

module.exports = routes;
