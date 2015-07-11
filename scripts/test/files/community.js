var init = require('../init');
var server = init.server;
var communityEndpoint;

before(function(done) {
    init.getEndpoints(function(endpoints) {
        communityEndpoint = endpoints.community;
        done();
    });
});

describe('Community Resource', function communityResourceTests() {

    var firstCommunity = 1;
    var secondCommunity = 2;

    // INTENTIONAL - there is not a fifth community in test data
    var fifthCommunity = 5;

    function validateCommunity(community) {
        (community == null).should.equal(false);
        community.should.not.instanceof(Array);
        community.should.instanceof(Object);
        community.should.have.property('idcommunity');
        community.should.have.property('name');
        community.should.have.property('description');
        community.should.have.property('iduser_fk');
        community.should.have.property('created_at');
        community.should.have.property('inactive');
        community.should.have.property('view');
    }

    describe('GET /community (List Communities)', function() {

        it('should respond with 4 communities', function(done) {

            server.inject({
                method: 'GET',
                url: communityEndpoint
            }, function(res) {

                res.statusCode.should.equal(200);
                res.result.should.be.instanceof(Array).and.have.lengthOf(4);
                res.result.forEach(validateCommunity);

                done();

            });

        });

    });

    describe('GET /community/{idcommunity} (Get Community)', function() {

        it('should respond with a community', function(done) {

            server.inject({
                method: 'GET',
                url: communityEndpoint + '/' + firstCommunity
            }, function(res) {

                res.statusCode.should.equal(200);
                validateCommunity(res.result);
                res.result.idcommunity.should.equal(firstCommunity);

                done();

            });

        });

        it('should respond with a different community', function(done) {

            server.inject({
                method: 'GET',
                url: communityEndpoint + '/' + secondCommunity
            }, function(res) {

                res.statusCode.should.equal(200);
                validateCommunity(res.result);
                res.result.idcommunity.should.equal(secondCommunity);
                res.result.idcommunity.should.not.equal(firstCommunity);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'GET',
                url: communityEndpoint + '/' + fifthCommunity
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

    describe('PUT /community/{idcommunity} (Update Community)', function() {

        it('should respond with status code 204', function(done) {

            server.inject({
                method: 'PUT',
                url: communityEndpoint + '/' + firstCommunity
            }, function(res) {

                res.statusCode.should.equal(204);
                (res.result === null).should.equal(true);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'PUT',
                url: communityEndpoint + '/' + fifthCommunity
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

});
