'use strict'

const Customer = use('App/Models/Customer');

class CustomerController {

    // TODO: retrieve only the customers owned by logged in user
    async index () {
        return await Customer.all();
    }
}

module.exports = CustomerController
