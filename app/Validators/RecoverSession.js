'use strict'

class RecoverSession {
  get rules() {
    return {
      email: 'required|email|max:254',
    }
  }

  get messages() {
    return {
      'email.required' : 'Email é obrigatório',
      'email.email' : 'Insira um email válido',
      'email.max' : 'Email deve conter menos de 255 caracteres',
    }
  }
}

module.exports = RecoverSession;
