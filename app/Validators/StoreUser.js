'use strict'

const BaseValidator = use('./BaseValidator')

class StoreUser extends BaseValidator {
  constructor() {
    super();
  }

  get rules() {
    return {
      email: 'required|email|unique:users,email|max:254',
      password: 'string|required|min:6|max:30',
      name: 'required|string|max:80',
      phone: 'string|min:10|max:11',
    }
  }

  get messages() {
    return {
      required: (field, validation) => this.message(field, validation),
      unique: (field, validation) => this.message(field, validation),
      email: (field, validation, args) => this.message(field, validation, args),
      min: (field, validation, args) => this.message(field, validation, args),
      max: (field, validation, args) => this.message(field, validation, args),
      string: (field, validation, args) => this.message(field, validation, args)
    }
  }
}

module.exports = StoreUser;
