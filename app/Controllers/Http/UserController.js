'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  async create({ request }) {
    const data = request.only(["name", "email", "phone", "password"])

    const rules = {
      email: 'required|email|unique:users,email|max:254',
      password: 'string|required|min:6|max:30',
      name: 'string|required|max:80',
      phone: 'string|min:10|max:11',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    try {
      const user = await User.create(data)
      return user
    } catch(err) {
      return err.message;
    }
  }
}

module.exports = UserController
