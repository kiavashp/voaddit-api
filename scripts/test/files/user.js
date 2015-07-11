var init = require('../init');
var server = init.server;
var userEndpoint;

before(function(done) {
    init.getEndpoints(function(endpoints) {
        userEndpoint = endpoints.user;
        done();
    });
});

describe('User Resource', function userResourceTests() {

    var firstUser = 1;
    var secondUser = 2;

    // INTENTIONAL - there is not a fourth user in test data
    var fourthUser = 4;

    function validateUser(user) {
        (user == null).should.equal(false);
        user.should.not.instanceof(Array);
        user.should.instanceof(Object);
        user.should.have.property('iduser');
        user.should.have.property('username');
        user.should.have.property('password');
        user.should.have.property('email');
        user.should.have.property('created_at');
        user.should.have.property('last_sign_in_at');
        user.should.have.property('last_sign_in_ip');
        user.should.have.property('inactive');
        user.should.have.property('view');
    }

    describe('GET /user (List Users)', function() {

        it('should respond with 3 users', function(done) {

            server.inject({
                method: 'GET',
                url: userEndpoint
            }, function(res) {

                res.statusCode.should.equal(200);
                res.result.should.be.instanceof(Array).and.have.lengthOf(3);
                res.result.forEach(validateUser);

                done();

            });

        });

    });

    describe('GET /user/{iduser} (Get User)', function() {

        it('should respond with a user', function(done) {

            server.inject({
                method: 'GET',
                url: userEndpoint + '/' + firstUser
            }, function(res) {

                res.statusCode.should.equal(200);
                validateUser(res.result);
                res.result.iduser.should.equal(firstUser);

                done();

            });

        });

        it('should respond with a different user', function(done) {

            server.inject({
                method: 'GET',
                url: userEndpoint + '/' + secondUser
            }, function(res) {

                res.statusCode.should.equal(200);
                validateUser(res.result);
                res.result.iduser.should.equal(secondUser);
                res.result.iduser.should.not.equal(firstUser);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'GET',
                url: userEndpoint + '/' + fourthUser
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

    describe('PUT /user/{iduser} (Update User)', function() {

        it('should respond with status code 204', function(done) {

            server.inject({
                method: 'PUT',
                url: userEndpoint + '/' + firstUser
            }, function(res) {

                res.statusCode.should.equal(204);
                (res.result === null).should.equal(true);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'PUT',
                url: userEndpoint + '/' + fourthUser
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

});
