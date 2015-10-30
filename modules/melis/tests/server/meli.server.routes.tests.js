'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Meli = mongoose.model('Meli'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, meli;

/**
 * Meli routes tests
 */
describe('Meli CRUD tests', function () {
    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function (done) {
        // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        // Save a user to the test db and create new Meli
        user.save(function () {
            meli = {
                name: 'Meli Name'
            };

            done();
        });
    });

    it('should be able to save Meli instance if logged in', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Meli
                agent.post('/api/melis')
                    .send(meli)
                    .expect(200)
                    .end(function (meliSaveErr, meliSaveRes) {
                        // Handle Meli save error
                        if (meliSaveErr) done(meliSaveErr);

                        // Get a list of Melis
                        agent.get('/api/melis')
                            .end(function (melisGetErr, melisGetRes) {
                                // Handle Meli save error
                                if (melisGetErr) done(melisGetErr);

                                // Get Melis list
                                var melis = melisGetRes.body;

                                // Set assertions
                                (melis[0].user._id).should.equal(userId);
                                (melis[0].name).should.match('Meli Name');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save Meli instance if not logged in', function (done) {
        agent.post('/api/melis')
            .send(meli)
            .expect(403)
            .end(function (meliSaveErr, meliSaveRes) {
                // Call the assertion callback
                done(meliSaveErr);
            });
    });

    it('should not be able to save Meli instance if no name is provided', function (done) {
        // Invalidate name field
        meli.name = '';

        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Meli
                agent.post('/api/melis')
                    .send(meli)
                    .expect(400)
                    .end(function (meliSaveErr, meliSaveRes) {
                        // Set message assertion
                        (meliSaveRes.body.message).should.match('Please fill Meli name');

                        // Handle Meli save error
                        done(meliSaveErr);
                    });
            });
    });

    it('should be able to update Meli instance if signed in', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Meli
                agent.post('/api/melis')
                    .send(meli)
                    .expect(200)
                    .end(function (meliSaveErr, meliSaveRes) {
                        // Handle Meli save error
                        if (meliSaveErr) done(meliSaveErr);

                        // Update Meli name
                        meli.name = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update existing Meli
                        agent.put('/api/melis/' + meliSaveRes.body._id)
                            .send(meli)
                            .expect(200)
                            .end(function (meliUpdateErr, meliUpdateRes) {
                                // Handle Meli update error
                                if (meliUpdateErr) done(meliUpdateErr);

                                // Set assertions
                                (meliUpdateRes.body._id).should.equal(meliSaveRes.body._id);
                                (meliUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of Melis if not signed in', function (done) {
        // Create new Meli model instance
        var meliObj = new Meli(meli);

        // Save the Meli
        meliObj.save(function () {
            // Request Melis
            request(app).get('/api/melis')
                .end(function (req, res) {
                    // Set assertion
                    res.body.should.be.an.Array.with.lengthOf(1);

                    // Call the assertion callback
                    done();
                });

        });
    });


    it('should be able to get a single Meli if not signed in', function (done) {
        // Create new Meli model instance
        var meliObj = new Meli(meli);

        // Save the Meli
        meliObj.save(function () {
            request(app).get('/api/melis/' + meliObj._id)
                .end(function (req, res) {
                    // Set assertion
                    res.body.should.be.an.Object.with.property('name', meli.name);

                    // Call the assertion callback
                    done();
                });
        });
    });

    it('should be able to delete Meli instance if signed in', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Meli
                agent.post('/api/melis')
                    .send(meli)
                    .expect(200)
                    .end(function (meliSaveErr, meliSaveRes) {
                        // Handle Meli save error
                        if (meliSaveErr) done(meliSaveErr);

                        // Delete existing Meli
                        agent.delete('/api/melis/' + meliSaveRes.body._id)
                            .send(meli)
                            .expect(200)
                            .end(function (meliDeleteErr, meliDeleteRes) {
                                // Handle Meli error error
                                if (meliDeleteErr) done(meliDeleteErr);

                                // Set assertions
                                (meliDeleteRes.body._id).should.equal(meliSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete Meli instance if not signed in', function (done) {
        // Set Meli user
        meli.user = user;

        // Create new Meli model instance
        var meliObj = new Meli(meli);

        // Save the Meli
        meliObj.save(function () {
            // Try deleting Meli
            request(app).delete('/api/melis/' + meliObj._id)
                .expect(403)
                .end(function (meliDeleteErr, meliDeleteRes) {
                    // Set message assertion
                    (meliDeleteRes.body.message).should.match('User is not authorized');

                    // Handle Meli error error
                    done(meliDeleteErr);
                });

        });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Meli.remove().exec(function () {
                done();
            });
        });
    });
});
