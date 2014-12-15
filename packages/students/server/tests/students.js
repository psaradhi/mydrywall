/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Student = mongoose.model('Student');

/**
 * Globals
 */
var user;
var student;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Student:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        student = new Student({
          title: 'Student Title',
          content: 'Student Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return student.save(function(err) {
          expect(err).to.be(null);
          expect(student.title).to.equal('Student Title');
          expect(student.content).to.equal('Student Content');
          expect(student.user.length).to.not.equal(0);
          expect(student.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        student.title = '';

        return student.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        student.content = '';

        return student.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        student.user = {};

        return student.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      student.remove(function () {
        user.remove(done);
      });
    });
  });
});
