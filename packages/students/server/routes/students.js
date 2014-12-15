'use strict';

var students = require('../controllers/students');

// Student authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.student.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Students, app, auth) {

  app.route('/students')
    .get(students.all)
    .post(auth.requiresLogin, students.create);
  app.route('/students/:studentId')
    .get(auth.isMongoId, students.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, students.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, students.destroy);

  // Finish with setting up the studentId param
  app.param('studentId', students.student);
};
