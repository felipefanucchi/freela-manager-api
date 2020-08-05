'use strict'

const Customer = use('App/Models/Customer');

class CustomerController {

    async index () {
        const user = await auth.getUser();
        return await user.customers().fetch();
    }
}

module.exports = CustomerController
