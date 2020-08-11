'use strict'

const CustomerContact = use('App/Models/CustomerContact')
const { validate } = use('Validator')

class CustomerContactController {

  // TODO: mover o "GET" de contatos para o "GET" do CustomerController, 
  // retornando o cliente já com os contatos
  async index ({ auth, request, response }) {
    const user = await auth.getUser()
    const data = request.only(['customer_id'])

    const rules = {
      customer_id: 'integer|required',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return response.status(400)
        .json(validation.messages());
    }

    return await user.customers()
      .with('customerContacts')
      .where('id', data.customer_id)
      .fetch()
  }

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
      return response.status(400)
        .json(validation.messages());
    }

    try {
      return await CustomerContact.create(data)
    } catch(err) {
      return response.status(500).json({
        message: err.message,
      })
    }
  }
}

module.exports = CustomerContactController
