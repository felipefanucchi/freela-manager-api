'use strict'

const Customer = use('App/Models/Customer')
const { validate } = use('Validator')

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

  async store ({ request, response, auth }) {
    const user = await auth.getUser()
    const data = request.only(['name'])

    const rules = {
      name: 'string|required|max:80',
    }

    const validation = await validate(data, rules)

    if (validation.fails()) {
      return response.status(400)
        .json(validation.messages())
    }

    let customer = new Customer()

    customer.fill(data)

    try {
      await user.customers().save(customer)
      return customer
    } catch(err) {
      return response.status(500).json({
        message: err.message,
      })
    }
  }
}

module.exports = CustomerController
