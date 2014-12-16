'use strict';

angular.module('mean.students').controller('StudentsController', ['$scope', '$stateParams', '$location', 'Global', 'Students',
  function($scope, $stateParams, $location, Global, Students) {
    $scope.global = Global;

    $scope.hasAuthorization = function(student) {
      if (!student || !student.user) return false;
      return $scope.global.isAdmin || student.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      console.log('sending request');
      if (isValid) {
        var student = new Students({
first_name: this.first_name,
middle_name: this.middle_name,
last_name: this.last_name,
father_first_name: this.father_first_name,
father_middle_name: this.father_middle_name,
father_last_name: this.father_last_name,
father_work_phone: this.father_work_phone,
father_home_phone: this.father_home_phone,
father_cell_phone: this.father_cell_phone,
father_email: this.father_email,
mother_first_name: this.mother_first_name,
mother_middle_name: this.mother_middle_name,
mother_last_name: this.mother_last_name,
mother_work_phone: this.mother_work_phone,
mother_home_phone: this.mother_home_phone,
mother_cell_phone: this.mother_cell_phone,
mother_email: this.mother_email,
student_address1: this.student_address1,
student_address2: this.student_address2,
student_city: this.student_city,
student_state: this.student_state,
student_zip: this.student_zip,
father_address1: this.father_address1,
father_address2: this.father_address2,
father_city: this.father_city,
father_state: this.father_state,
father_zip: this.father_zip,
mother_address1: this.mother_address1,
mother_address2: this.mother_address2,
mother_city: this.mother_city,
mother_state: this.mother_state,
mother_zip: this.mother_zip,
grade: this.grade
          

        });
        console.log(student);
        student.$save(function(response) {
          console.log(response);
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
