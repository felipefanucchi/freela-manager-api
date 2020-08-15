'use strict'
import Validator from './Validator';

class LoginSession extends Validator {
  get rules() {
    return {
      email: 'required|email|max:254',
      password: 'required|min:6|max:30',
      remember_me: 'boolean'
    }
  }

  get messages() {
    return {
      'email.required' : 'Email é obrigatório',
      'email.email' : 'Insira um email válido',
      'email.max' : 'Email deve conter menos de 255 caracteres',
      'password.required': 'Senha é obrigatória',
      'password.min' : 'Senha deve ter no mínimo 6 caracteres',
      'password.max' : 'Senha deve ter no máximo 30 caracteres',
    }
  }
}

module.exports = LoginSession;
