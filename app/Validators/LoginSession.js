'use strict'

const BaseValidator = use('./BaseValidator');

class LoginSession extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|max:254',
      password: 'required|min:6|max:30',
      remember_me: 'boolean'
    }
  }

  get messages() {
    return {
      required: (field, validation) => this.message(field, validation),
      email: (field, validation, args) => this.message(field, validation, args),
      min: (field, validation, args) => this.message(field, validation, args),
      max: (field, validation, args) => this.message(field, validation, args),
      boolean: (field, validation) => this.message(field, validation)
    }
  }
}

module.exports = LoginSession;
