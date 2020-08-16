'use strict'

const { validate } = use('Validator')
const Database = use('Database')
const Encryption = use('Encryption')
const Mail = use('Mail')

class SessionController {
  async login({ request, response, auth }) {
    const {email, password, remember_me} = request.only(["email", "password", "remember_me"])

    try{
      const token = await auth
        .attempt(email, password)
      return response.ok(token);
    } catch(err) {
      console.log(err)
      return response.badRequest({message: 'Usuário não encontrado.'});
    }
  }

  async recover({ request, response }) {
    const { email } = request.only(["email"]);

    const rules = {
      email: 'required|email|max:254'
    }

    const validation = await validate(email, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const user = await Database
      .table('users')
      .where('email', email)
      .first()

    if (!user) {
      return response.status(400).send({ message: "Usuário não encontrado" })
    }

    const token = Encryption.encrypt(process.env.RESET_TOKEN_KEY)
    const now = new Date()
    now.setHours(now.getHours() + 1)

    await Database
      .table('users')
      .where('email', email)
      .update({
        password_reset_token: token,
        password_reset_expires: now
      })

    try {
      await Mail.send('emails.recover-password', {name: user.name, token: user.password_reset_token},
        message => {
          message
            .to(user.email)
            .from('contato@freelamanager.com')
            .subject('Freela Manager | Recupere sua senha!')
        }
      )

      return response.noContent();
    } catch(err) {
      return response.badRequest({ message: "Erro ao enviar email, tente novamente mais tarde" })
    }
  }
}

module.exports = SessionController
