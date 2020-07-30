'use strict'

const { validate, rule } = use('Validator')
const User = use('App/Models/User')

class AuthController {
  async store({ request }) {
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

  async login({ request, auth }) {
    const {email, password, remember_me} = request.only(["email", "password", "remember_me"])

    const rules = {
      email: 'required|email|max:254',
      password: 'required|min:6|max:30',
      remember_me: 'boolean'
    }

    const validation = await validate({email, password, remember_me}, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    try{
      const token = await auth.attempt(email, password)
      return token
    } catch(err) {
      return err
    }
  }
}

module.exports = AuthController
