'use strict';

angular.module('mean.students').controller('StudentsController', ['$scope', '$stateParams', '$location', 'Global', 'Students',
  function($scope, $stateParams, $location, Global, Students) {
    $scope.global = Global;

    $scope.hasAuthorization = function(student) {
      if (!student || !student.user) return false;
      return $scope.global.isAdmin || student.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var student = new Students({
          title: this.title,
          content: this.content
        });
        student.$save(function(response) {
          $location.path('students/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(student) {
      if (student) {
        student.$remove(function(response) {
          for (var i in $scope.students) {
            if ($scope.students[i] === student) {
              $scope.students.splice(i, 1);
            }
          }
          $location.path('students');
        });
      } else {
        $scope.student.$remove(function(response) {
          $location.path('students');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var student = $scope.student;
        if (!student.updated) {
          student.updated = [];
        }
        student.updated.push(new Date().getTime());

        student.$update(function() {
          $location.path('students/' + student._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Students.query(function(students) {
        $scope.students = students;
      });
    };

    $scope.findOne = function() {
      Students.get({
        studentId: $stateParams.studentId
      }, function(student) {
        $scope.student = student;
      });
    };
  }
]);
