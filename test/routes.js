
var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var User = require('../UserModel');

describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    mongoose.connect(config.db.mongodb);				
    done();
  });

  describe('TEST: Get all the users', function() {

    it('should return all the users', function(done) {
      request(url)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) { 
        if (err) throw err;
            res.body.should.be.an.instanceOf(Object).and.have.lengthOf(1);
            done();
      });
    });
  });


  describe('TEST: Get user by email', function() {

    it('should return all the users', function(done) {
      request(url)
      .get('/user/grakesh18@gmail.com')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) { 
        if (err) throw err;

          res.body.should.have.property('firstname');
          res.body.should.have.property('_id');
          done();
      });

    });

  });

 
  describe('User', function() {
    it('TEST: SAVE USER - should return error trying to save duplicate username', function(done) {
      var body = { 
                  firstname: 'Rakesh', 
                  lastname: 'Gupta',
                  email: 'grakesh18@gmail.com',
                  password: 'test@123',
                  active: true,
                  address: {'city':'Mumbai', 'pincode': '400001', 'landmark': 'Surya Shopping'}
                };
    request(url)
	.post('/user')
	.send(body)
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
          if (err) {
            throw err;
          }
            res.body.should.have.property('firstname');
          done();
        });
    });
  });

});