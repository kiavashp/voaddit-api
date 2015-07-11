var init = require('../init');
var server = init.server;
var postEndpoint;

before(function(done) {
    init.getEndpoints(function(endpoints) {
        postEndpoint = endpoints.post;
        done();
    });
});

describe('Post Resource', function postResourceTests() {

    var firstPost = 1;
    var secondPost = 2;

    // INTENTIONAL - there is not a fifth post in test data
    var fifthPost = 5;

    function validatePost(post) {
        (post == null).should.equal(false);
        post.should.not.instanceof(Array);
        post.should.instanceof(Object);
        post.should.have.property('idpost');
        post.should.have.property('title');
        post.should.have.property('content_url');
        post.should.have.property('iduser_fk');
        post.should.have.property('idcommunity_fk');
        post.should.have.property('upvoad');
        post.should.have.property('downvoad');
        post.should.have.property('created_at');
        post.should.have.property('edited_at');
        post.should.have.property('inactive');
        post.should.have.property('view');
    }

    describe('GET /post (List Posts)', function() {

        it('should respond with 4 posts', function(done) {

            server.inject({
                method: 'GET',
                url: postEndpoint
            }, function(res) {

                res.statusCode.should.equal(200);
                res.result.should.be.instanceof(Array).and.have.lengthOf(4);
                res.result.forEach(validatePost);

                done();

            });

        });

    });

    describe('GET /post/{idpost} (Get Post)', function() {

        it('should respond with a post', function(done) {

            server.inject({
                method: 'GET',
                url: postEndpoint + '/' + firstPost
            }, function(res) {

                res.statusCode.should.equal(200);
                validatePost(res.result);
                res.result.idpost.should.equal(firstPost);

                done();

            });

        });

        it('should respond with a different post', function(done) {

            server.inject({
                method: 'GET',
                url: postEndpoint + '/' + secondPost
            }, function(res) {

                res.statusCode.should.equal(200);
                validatePost(res.result);
                res.result.idpost.should.equal(secondPost);
                res.result.idpost.should.not.equal(firstPost);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'GET',
                url: postEndpoint + '/' + fifthPost
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

    describe('PUT /post/{idpost} (Update Post)', function() {

        it('should respond with status code 204', function(done) {

            server.inject({
                method: 'PUT',
                url: postEndpoint + '/' + firstPost
            }, function(res) {

                res.statusCode.should.equal(204);
                (res.result === null).should.equal(true);

                done();

            });

        });

        it('should respond with status code 404', function(done) {

            server.inject({
                method: 'PUT',
                url: postEndpoint + '/' + fifthPost
            }, function(res) {

                res.statusCode.should.equal(404);

                done();

            });

        });

    });

});
