'use strict'

const { validate } = use('Validator')

class AuthenticationController {
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

module.exports = AuthenticationController
