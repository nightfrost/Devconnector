const Validator = require("validator");
const isEmpty = require('./is-empty');
// import {isEmpty} from './is-empty';


module.exports = function validateRegisterInput(data) {  
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //If name NOT between 2 and 30
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  //If name Empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  //If Email empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  //If email NOT email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  //If password empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  //If password NOT between 6 and 30 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  //If password2 empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  //If password NOT EQUEALS password2
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }


  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}