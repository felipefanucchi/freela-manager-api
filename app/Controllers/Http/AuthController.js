'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class AuthController {
  store({ request }) {
    const data = request.only(["name", "email", "phone", "password", "password_confirmation"])

    const rules = {
      email: 'required|email|unique:users,email|max:254',
      password: 'string|required|min:6|max:30',
      password_confirmation:[ rule('equals', password) ],
      name: 'string|required|max:80',
      phone: 'string|min:10|max:11',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const user = await User.create(data)

    return user
  }

  async login({ request, auth }) {
    const logged = await auth.getUser();

    if (logged) {
      return response.send("Você já está logado.")
    }

    const {email, password, remember_me} = request.only(["email", "password", "remember_me"])

    const rules = {
      email: 'required|email|max:254',
      password: 'required|min:6|max:30',
      remember_me: 'boolean'
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const token = await auth
      .remember(remember_me)
      .attempt(email, password)

    return token
  }
}

module.exports = AuthController
