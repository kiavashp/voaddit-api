var controller = require('./controller');

var rootRoute = {
    method: 'GET',
    path: '/',
    handler: controller.getRoot
};

module.exports = rootRoute;
