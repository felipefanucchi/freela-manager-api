'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  customerContacts () {
    return this.hasMany('App/Models/CustomerContact')
  }
}

module.exports = Customer
