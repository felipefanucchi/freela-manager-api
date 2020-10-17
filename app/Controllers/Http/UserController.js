'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  async create({ request }) {
    const data = request.only(["name", "email", "phone", "password"])

    try {
      const user = await User.create(data)
      return user
    } catch(err) {
      return err.message;
    }
  }
}

module.exports = UserController
