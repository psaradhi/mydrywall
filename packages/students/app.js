'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Students = new Module('students');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Students.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Students.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Students.menus.add({
    'roles': ['authenticated'],
    'title': 'Students',
    'link': 'all students'
  });
  Students.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Student',
    'link': 'create student'
  });

  //Students.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Students.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Students.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Students.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Students.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Students.aggregateAsset('css', 'students.css');

  return Students;
});
