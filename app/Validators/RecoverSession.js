'use strict'

const BaseValidator = use('./BaseValidator')

class RecoverSession extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|max:254',
    }
  }

  get messages() {
    return {
      required: (field, validation) => this.message(field, validation),
      email: (field, validation, args) => this.message(field, validation, args),
      max: (field, validation, args) => this.message(field, validation, args)
    }
  }
}

module.exports = RecoverSession;
