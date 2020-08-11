'use strict'

const CustomerContact = use('App/Models/CustomerContact')
const { validate } = use('Validator')

class CustomerContactController {
  async store ({ request, response, auth }) {
    const user = await auth.getUser()
    const data = request.only([
      'name',
      'email',
      'phone',
      'can_receive_charge_notifications',
      'can_accept_proposal',
      'customer_id',
    ])

    const rules = {
      name: 'string|required|max:80',
      email: 'required|email|max:254',
      phone: 'string|min:10|max:11',
      can_receive_charge_notifications: 'boolean',
      can_accept_proposal: 'boolean',
      customer_id: 'integer|required',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    // TODO: criar validação "exists:customers,id" que valida existencia de 
    // customer vinculado ao user
    const customer = await user.customers()
      .where('id', data.customer_id)
      .first()

    if (!customer) {
      return response.unauthorized({
        message: 'Cliente não encontrado ou não pertence ao usuário informado'
      })
    }

    try {
      return await CustomerContact.create(data)
    } catch(err) {
      return response.internalServerError(err)
    }
  }
}

module.exports = CustomerContactController
