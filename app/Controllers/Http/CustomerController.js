'use strict'

const Customer = use('App/Models/Customer')
const { validate } = use('Validator')
const Database = use('Database')

class CustomerController {
  async index ({ auth }) {
    const user = await auth.getUser()
    return await user.customers().fetch()
  }

  async show ({ auth, params }) {
    const user = await auth.getUser()
    return await user.customers()
      .with('customerContacts')
      .where('id', params.id)
      .fetch()
  }

  // TODO??:
  // Criar validação para nao permitir que um usuario já salvo em uma agencia,
  // seja salvo novamente, em outra agencia.
  async store ({ request, response, auth }) {
    const user = await auth.getUser()
    const data = request.only(['name'])

    const rules = {
      name: 'string|required|max:80',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    let customer = new Customer()

    customer.fill(data)

    try {
      await user.customers().save(customer)
      return customer
    } catch(err) {
      return response.internalServerError(err)
    }
  }

  async update ({ request, response, auth, params }) {
    const { name } = request.only(["name"])
    const user = await auth.getUser()
    const { id } = params;

    try {
      await user
        .customers()
        .where({ id })
        .update({ name });

      return response.noContent()
    } catch(err) {
      return response.internalServerError({ message: 'Erro ao atualizar os dados do cliente' })
    }
  }
}

module.exports = CustomerController
