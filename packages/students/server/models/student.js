'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Student Schema
 */
var StudentSchema = new Schema({
  first_name:         {type: String, required: false},
  middle_name:        {type: String, required: false},
  last_name:          {type: String, required: false},
  
  father_first_name:  {type: String, required: false},
  father_middle_name: {type: String, required: false},
  father_last_name:   {type: String, required: false},
  father_work_phone:  {type: String, required: false},
  father_home_phone:  {type: String, required: false},
  father_cell_phone:  {type: String, required: false},
  father_email:       {type: String, required: false},
  
  mother_first_name:  {type: String, required: false},
  mother_middle_name: {type: String, required: false},
  mother_last_name:   {type: String, required: false},
  mother_work_phone:  {type: String, required: false},
  mother_home_phone:  {type: String, required: false},
  mother_cell_phone:  {type: String, required: false},
  mother_email:       {type: String, required: false},

  student_address1:   {type: String, required: false},
  student_address2:   {type: String, required: false},
  student_city:       {type: String, required: false},
  student_state:      {type: String, required: false},
  student_zip:        {type: String, required: false},

  father_address1:    {type: String, required: false},
  father_address2:    {type: String, required: false},
  father_city:        {type: String, required: false},
  father_state:       {type: String, required: false},
  father_zip:         {type: String, required: false},

  mother_address1:    {type: String, required: false},
  mother_address2:    {type: String, required: false},
  mother_city:        {type: String, required: false},
  mother_state:       {type: String, required: false},
  mother_zip:         {type: String, required: false},

  grade:              {type: Number, required: false},
  created:            {type: Date, default: Date.now },
});

/**
 * Validations
StudentSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

StudentSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');
 */

/**
 * Statics
 */
StudentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Student', StudentSchema);
