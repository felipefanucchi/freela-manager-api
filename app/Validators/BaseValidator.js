class BaseValidator {
  constructor() {}

  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages);
  }

  message(field, validation, args) {
    const messages = {
      required: `O campo ${field} é obrigatório`,
      unique: `O valor do campo '${field}' já foi registrado anteriormente`,
      email: `O email deve ser válido`,
      min: `O campo '${field}' deve ter no nínimo ${args} caracteres.`,
      max: `O campo '${field}' deve ter no máximo ${args} caracteres.`,
      string: `O campo '${field}' deve ser do tipo 'STRING'`,
      boolean: `O campo '${field}' deve ser do tipo 'BOOLEAN (true | false)'`,
    };

    const message = messages[validation];

    if (!message) {
      throw new Error('Esta mensagem de erro não existe');
    }

    return message;
  }
}

module.exports = BaseValidator;
