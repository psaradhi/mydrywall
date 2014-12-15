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
  first_name:         {type: String, required: true},
  middle_name:        {type: String, required: true},
  last_name:          {type: String, required: true},
  
  father_first_name:  {type: String, required: true},
  father_middle_name: {type: String, required: true},
  father_last_name:   {type: String, required: true},
  father_work_phone:  {type: String, required: true},
  father_home_phone:  {type: String, required: true},
  father_cell_phone:  {type: String, required: true},
  father_email:       {type: String, required: true},
  
  mother_first_name:  {type: String, required: true},
  mother_middle_name: {type: String, required: true},
  mother_last_name:   {type: String, required: true},
  mother_work_phone:  {type: String, required: true},
  mother_home_phone:  {type: String, required: true},
  mother_cell_phone:  {type: String, required: true},
  mother_email:       {type: String, required: true},

  student_address1:   {type: String, required: true},
  student_address2:   {type: String, required: true},
  student_city:       {type: String, required: true},
  student_state:      {type: String, required: true},
  student_zip:        {type: String, required: true},

  father_address1:    {type: String, required: true},
  father_address2:    {type: String, required: true},
  father_city:        {type: String, required: true},
  father_state:       {type: String, required: true},
  father_zip:         {type: String, required: true},

  mother_address1:    {type: String, required: true},
  mother_address2:    {type: String, required: true},
  mother_city:        {type: String, required: true},
  mother_state:       {type: String, required: true},
  mother_zip:         {type: String, required: true},

  grade:              {type: Number, required: true},
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
StudentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
 */

mongoose.model('Student', StudentSchema);
