'use strict'
import Validator from './Validator';

class StoreUser extends Validator {
  get rules() {
    return {
      email: 'required|email|unique:users,email|max:254',
      password: 'string|required|min:6|max:30',
      name: 'string|required|max:80',
      phone: 'string|min:10|max:11',
    }
  }

  get messages() {
    return {
      'email.required' : 'Email é obrigatório',
      'email.email' : 'Insira um email válido',
      'email.unique' : 'Este email já foi cadastrado',
      'email.max' : 'Email deve conter menos de 255 caracteres',
      'password.required': 'Senha é obrigatória',
      'password.min' : 'Senha deve ter no mínimo 6 caracteres',
      'password.max' : 'Senha deve ter no máximo 30 caracteres',
      'name.required' : 'Nome é obrigatório',
      'name.max' : 'Nome deve ter no máximo 80 caracteres',
      'phone.max' : 'Telefone deve ter no máximo 11 números',
      'phone.min' : 'Telefone deve ter no mínimo 10 números',
    }
  }
}

module.exports = StoreUser;
