'use strict'

const Customer = use('App/Models/Customer');

class CustomerController {

    // TODO: retrieve only the customers owned by logged in user
    index ({request, response}) {
        const customers = new Customer();
        return await customers.all();
    }
}

module.exports = CustomerController
