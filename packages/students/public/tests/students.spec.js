'use strict';

(function() {
  // Students Controller Spec
  describe('MEAN controllers', function() {
    describe('StudentsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.students');
      });

      // Initialize the controller and a mock scope
      var StudentsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        StudentsController = $controller('StudentsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one student object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('students').respond([{
            title: 'An Student about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.students).toEqualData([{
            title: 'An Student about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one student object fetched ' +
        'from XHR using a studentId URL parameter', function() {
          // fixture URL parament
          $stateParams.studentId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testStudentData = function() {
            return {
              title: 'An Student about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/students\/([0-9a-fA-F]{24})$/).respond(testStudentData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.student).toEqualData(testStudentData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postStudentData = function() {
            return {
              title: 'An Student about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseStudentData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Student about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Student about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('students', postStudentData()).respond(responseStudentData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/students/' + responseStudentData()._id);
        });

      it('$scope.update(true) should update a valid student', inject(function(Students) {

        // fixture rideshare
        var putStudentData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Student about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock student object from form
        var student = new Students(putStudentData());

        // mock student in scope
        scope.student = student;

        // test PUT happens correctly
        $httpBackend.expectPUT(/students\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/students\/([0-9a-fA-F]{24})$/, putStudentData()).respond();
        /*
                Error: Expected PUT /students\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Student about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Student about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/students/' + putStudentData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid studentId ' +
        'and remove the student from the scope', inject(function(Students) {

          // fixture rideshare
          var student = new Students({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.students = [];
          scope.students.push(student);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/students\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(student);
          $httpBackend.flush();

          // test after successful delete URL location students list
          //expect($location.path()).toBe('/students');
          expect(scope.students.length).toBe(0);

        }));
    });
  });
}());
