var should = require('should');
var object = {};

object.server = require('../../lib');
object.endpoints = {};

object.getEndpoints = function getEndpoints(callback) {

    if (Object.keys(object.endpoints).length) {
        return process.nextTick(function() {
            callback(object.endpoints);
        });
    }

    object.server.inject({
        method: 'GET',
        url: '/'
    }, function(res) {

        var r;

        res.statusCode.should.equal(200);
        (res.result === null).should.equal(false);
        res.result.should.instanceof(Object);
        res.result.should.not.instanceof(Array);
        res.result.should.have.property('user');
        res.result.should.have.property('community');
        res.result.should.have.property('post');

        for (r in res.result) {
            object.endpoints[r] = res.result[r];
        }

        return callback(object.endpoints);

    });

};

module.exports = object;
