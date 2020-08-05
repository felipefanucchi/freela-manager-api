'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerContactsSchema extends Schema {
  up () {
    this.create('customer_contacts', (table) => {
      table.increments()
      table.integer('customer_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('customers')
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable()
      table.string('phone', 11)
      table.boolean('can_receive_charge_notifications').notNullable()
      table.boolean('can_accept_proposal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_contacts')
  }
}

module.exports = CustomerContactsSchema
